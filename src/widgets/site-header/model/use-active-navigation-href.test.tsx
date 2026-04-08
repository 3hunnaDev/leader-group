import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { navigationItems } from '@shared/config/navigation'
import { resolveActiveNavigationHref, useActiveNavigationHref } from './use-active-navigation-href'

function ActiveHrefProbe() {
  const activeHref = useActiveNavigationHref(navigationItems)

  return <div data-testid="active-href">{activeHref ?? 'null'}</div>
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
})
