import { act, render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { navigationItems } from '@shared/config/navigation'
import {
  resolveActiveNavigationHref,
  resolveActiveNavigationHrefBySectionBounds,
  useActiveNavigationHref,
} from './use-active-navigation-href'

function ActiveHrefProbe() {
  const activeHref = useActiveNavigationHref(navigationItems)

  return <div data-testid="active-href">{activeHref ?? 'null'}</div>
}

function createRect({
  top,
  bottom,
  left = 0,
  right = 0,
}: {
  top: number
  bottom: number
  left?: number
  right?: number
}): DOMRect {
  return {
    bottom,
    height: bottom - top,
    left,
    right,
    toJSON: () => ({}),
    top,
    width: right - left,
    x: left,
    y: top,
  } as DOMRect
}

function mockElementRect(element: Element, rect: DOMRect) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: () => rect,
  })
}

describe('resolveActiveNavigationHref', () => {
  it('returns the matching navigation href for known sections', () => {
    expect(resolveActiveNavigationHref(navigationItems, '/#projects')).toBe('/#projects')
  })

  it('maps root and empty locations to the home section', () => {
    expect(resolveActiveNavigationHref(navigationItems, '/')).toBe('/#home')
    expect(resolveActiveNavigationHref(navigationItems, '')).toBe('/#home')
  })

  it('returns null for unknown sections', () => {
    expect(resolveActiveNavigationHref(navigationItems, '/#missing')).toBeNull()
  })
})

describe('resolveActiveNavigationHrefBySectionBounds', () => {
  it('keeps the first section active when the viewport is above its top edge', () => {
    expect(
      resolveActiveNavigationHrefBySectionBounds(
        [
          { href: '/#home', top: 124, bottom: 520 },
          { href: '/#solutions', top: 640, bottom: 1080 },
        ],
        108,
      ),
    ).toBe('/#home')
  })

  it('returns the section that currently overlaps the header probe', () => {
    expect(
      resolveActiveNavigationHrefBySectionBounds(
        [
          { href: '/#home', top: -320, bottom: 80 },
          { href: '/#solutions', top: 80, bottom: 460 },
          { href: '/#why-us', top: 460, bottom: 900 },
        ],
        108,
      ),
    ).toBe('/#solutions')
  })

  it('keeps the nearest previous section active between navigation anchors', () => {
    expect(
      resolveActiveNavigationHrefBySectionBounds(
        [
          { href: '/#home', top: -640, bottom: -120 },
          { href: '/#solutions', top: -40, bottom: 280 },
          { href: '/#why-us', top: 420, bottom: 920 },
        ],
        320,
      ),
    ).toBe('/#solutions')
  })
})

describe('useActiveNavigationHref', () => {
  it('reacts to router location changes', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: <ActiveHrefProbe />,
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    render(<RouterProvider router={router} />)
    expect(screen.getByTestId('active-href')).toHaveTextContent('/#home')

    await router.navigate({ hash: '#projects', pathname: '/' })
    await waitFor(() => {
      expect(screen.getByTestId('active-href')).toHaveTextContent('/#projects')
    })

    await router.navigate('/#missing')
    await waitFor(() => {
      expect(screen.getByTestId('active-href')).toHaveTextContent('null')
    })
  })

  it('syncs active navigation with scroll position on the home page', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: (
            <>
              <header className="site-header" data-testid="header" />
              <ActiveHrefProbe />
              <section id="home" data-testid="home-section" />
              <section id="solutions" data-testid="solutions-section" />
              <section id="why-us" data-testid="why-us-section" />
              <section id="projects" data-testid="projects-section" />
              <footer id="contact" data-testid="contact-section" />
            </>
          ),
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    render(<RouterProvider router={router} />)

    mockElementRect(screen.getByTestId('header'), createRect({ top: 0, bottom: 84, right: 240 }))
    mockElementRect(
      screen.getByTestId('home-section'),
      createRect({ top: -320, bottom: -24, right: 360 }),
    )
    mockElementRect(
      screen.getByTestId('solutions-section'),
      createRect({ top: 12, bottom: 420, right: 360 }),
    )
    mockElementRect(
      screen.getByTestId('why-us-section'),
      createRect({ top: 520, bottom: 960, right: 360 }),
    )
    mockElementRect(
      screen.getByTestId('projects-section'),
      createRect({ top: 1080, bottom: 1480, right: 360 }),
    )
    mockElementRect(
      screen.getByTestId('contact-section'),
      createRect({ top: 1640, bottom: 2140, right: 360 }),
    )

    act(() => {
      window.dispatchEvent(new Event('load'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('active-href')).toHaveTextContent('/#solutions')
    })
  })

  it('resolves Home before the first paint when the url hash is stale but the page is already at the top', () => {
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function mockBoundingClientRect(this: HTMLElement) {
        if (this.classList.contains('site-header')) {
          return createRect({ top: 0, bottom: 84, right: 240 })
        }

        switch (this.id) {
          case 'home':
            return createRect({ top: 0, bottom: 420, right: 360 })
          case 'solutions':
            return createRect({ top: 520, bottom: 960, right: 360 })
          case 'why-us':
            return createRect({ top: 1080, bottom: 1520, right: 360 })
          case 'projects':
            return createRect({ top: 1640, bottom: 2080, right: 360 })
          case 'contact':
            return createRect({ top: 2200, bottom: 2640, right: 360 })
          default:
            return originalGetBoundingClientRect.call(this)
        }
      })

    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: (
            <>
              <header className="site-header" />
              <ActiveHrefProbe />
              <section id="home" />
              <section id="solutions" />
              <section id="why-us" />
              <section id="projects" />
              <footer id="contact" />
            </>
          ),
        },
      ],
      {
        initialEntries: ['/#projects'],
      },
    )

    try {
      render(<RouterProvider router={router} />)

      expect(screen.getByTestId('active-href')).toHaveTextContent('/#home')
    } finally {
      rectSpy.mockRestore()
    }
  })
})
