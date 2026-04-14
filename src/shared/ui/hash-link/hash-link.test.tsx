import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { HashLink } from './hash-link'

describe('HashLink', () => {
  it('scrolls to the section when the current hash target is clicked again', async () => {
    const user = userEvent.setup()
    const scrollToSpy = vi.mocked(window.scrollTo)

    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <header className="site-header" />
        <HashLink to="/#contact">Contact</HashLink>
        <section id="contact">Contacts section</section>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: 'Contact' }))

    expect(scrollToSpy).toHaveBeenCalled()
    expect(sessionStorage.getItem('leader-group:scroll-restore-state')).toBe(
      JSON.stringify({
        href: '/#contact',
        mode: 'anchor',
        pathname: '/',
        top: 0,
      }),
    )
  })
})
