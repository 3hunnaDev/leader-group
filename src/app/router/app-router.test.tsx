import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(heading).toHaveTextContent(/vertical mobility/i)
    expect(heading).toHaveTextContent(/architecture/i)
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
      expect(document.title).toBe('Home :: Leader Group')
    })

    await router.navigate('/#projects')

    await waitFor(() => {
      expect(document.title).toBe('Projects :: Leader Group')
    })
  })

  it('switches the site copy to Russian when the locale toggle is used', async () => {
    const user = userEvent.setup()
    const router = createRouter('/')

    render(<RouterProvider router={router} />)

    const russianSwitch = document.querySelector<HTMLButtonElement>(
      '.site-header-desktop .site-header-locale-switch__button[data-language="ru"]',
    )

    if (!russianSwitch) {
      throw new Error('Expected Russian language switch to be rendered')
    }

    await user.click(russianSwitch)

    await waitFor(() => {
      expect(document.title).toBe('Главная :: Leader Group')
    })

    expect(
      await screen.findByRole('heading', { level: 1, name: /вертикальная мобильность/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Запросить предложение' }).length).toBeGreaterThan(0)
  })
})
