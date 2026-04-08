import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { HomeProjectsSection } from './home-projects-section'

describe('HomeProjectsSection', () => {
  it('switches the active project and updates the visible position', async () => {
    const user = userEvent.setup()

    render(<HomeProjectsSection />)

    expect(screen.getByText('1 / 4')).toBeInTheDocument()
    expect(screen.getByText('Riverhouse').closest('article')).toHaveClass(
      'home-projects__card--primary',
    )

    await user.click(screen.getByRole('button', { name: 'Показать следующий проект' }))

    expect(screen.getByText('2 / 4')).toBeInTheDocument()
    expect(screen.getByText('Аструм').closest('article')).toHaveClass(
      'home-projects__card--primary',
    )
  })
})
