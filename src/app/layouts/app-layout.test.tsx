import { StrictMode } from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppLayout } from './app-layout'

vi.mock('@widgets/site-header', () => ({
  SiteHeader: ({ lockedActiveHref }: { lockedActiveHref?: string | null }) => (
    <header
      className="site-header"
      data-locked-active-href={lockedActiveHref ?? ''}
      data-testid="site-header"
    />
  ),
}))

function HomePageStub() {
  return (
    <main>
      <section id="home" data-testid="home-section" style={{ minHeight: '100vh' }} />
      <section id="solutions" data-testid="solutions-section" style={{ minHeight: '100vh' }} />
      <section id="why-us" data-testid="why-us-section" style={{ minHeight: '100vh' }} />
      <section id="projects" data-testid="projects-section" style={{ minHeight: '100vh' }} />
      <section id="contact" data-testid="contact-section" style={{ minHeight: '100vh' }} />
    </main>
  )
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

describe('AppLayout', () => {
  it('restores the saved home-page scroll position on the initial load in StrictMode', async () => {
    sessionStorage.setItem(
      'leader-group:scroll-restore-state',
      JSON.stringify({
        href: '/#solutions',
        mode: 'scroll',
        pathname: '/',
        top: 1800,
      }),
    )

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <HomePageStub />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )

    await waitFor(() => {
      expect(vi.mocked(window.scrollTo).mock.calls.at(-1)?.[0]).toEqual({
        behavior: 'smooth',
        top: 1800,
      })
    })

    expect(vi.mocked(window.scrollTo).mock.calls[0]?.[0]).toEqual({
      behavior: 'auto',
      top: 0,
    })
  })

  it('releases the locked nav item when the user manually overrides a smooth hash scroll', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <HomePageStub />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    )

    render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )

    mockElementRect(
      screen.getByTestId('site-header'),
      createRect({ top: 0, bottom: 84, right: 240 }),
    )
    mockElementRect(
      screen.getByTestId('projects-section'),
      createRect({ top: 1280, bottom: 1880, right: 360 }),
    )

    await router.navigate('/#projects')

    await waitFor(() => {
      expect(screen.getByTestId('site-header')).toHaveAttribute(
        'data-locked-active-href',
        '/#projects',
      )
    })

    act(() => {
      window.dispatchEvent(new WheelEvent('wheel'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('site-header')).toHaveAttribute('data-locked-active-href', '')
    })
  })

  it('prefers the latest scroll snapshot over an older hash target on reload', async () => {
    sessionStorage.setItem(
      'leader-group:scroll-restore-state',
      JSON.stringify({
        href: '/#contact',
        mode: 'scroll',
        pathname: '/',
        top: 4200,
      }),
    )

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <HomePageStub />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/#projects'],
      },
    )

    render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )

    await waitFor(() => {
      expect(vi.mocked(window.scrollTo).mock.calls.at(-1)?.[0]).toEqual({
        behavior: 'smooth',
        top: 4200,
      })
    })
  })
})
