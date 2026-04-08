import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { appRoutes } from './app-router'

function createRouter(initialEntry: string) {
  return createMemoryRouter(appRoutes, {
    initialEntries: [initialEntry],
  })
}

describe('appRoutes', () => {
  it('renders the home page on the root route', async () => {
    const router = createRouter('/')

    render(<RouterProvider router={router} />)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/поставка и/i)
    expect(heading).toHaveTextContent(/подъемных/i)
  })

  it('renders the not found page for unknown routes', async () => {
    const router = createRouter('/missing')

    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toBeInTheDocument()
  })

  it('updates the page title when the active hash section changes', async () => {
    const router = createRouter('/')

    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(document.title).toBe('Главная :: Leader Group')
    })

    await router.navigate('/#projects')

    await waitFor(() => {
      expect(document.title).toBe('Наши проекты :: Leader Group')
    })
  })
})
