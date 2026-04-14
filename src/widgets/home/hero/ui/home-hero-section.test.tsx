import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HomeHeroSection } from './home-hero-section'

describe('HomeHeroSection', () => {
  it('renders the editorial heading, actions, and media placeholders', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomeHeroSection />
      </MemoryRouter>,
    )

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toHaveTextContent(/vertical mobility/i)
    expect(heading).toHaveTextContent(/built/i)
    expect(heading).toHaveTextContent(/architecture\./i)
    expect(
      screen.getByText(/we design, supply, install, and service lifts, escalators/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Request a proposal' })).toHaveAttribute(
      'href',
      '/#contact',
    )
    expect(screen.getByRole('link', { name: 'Explore solutions' })).toHaveAttribute(
      'href',
      '/#solutions',
    )
    expect(screen.getByText('Hero image / 16:9')).toBeInTheDocument()
    expect(screen.getByText('Supporting image / 4:5')).toBeInTheDocument()
    expect(screen.getByText('Leader Group / Vertical Mobility')).toBeInTheDocument()
  })

  it('exposes the hero section through the home anchor', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomeHeroSection />
      </MemoryRouter>,
    )

    expect(document.querySelector('#home')).toBeInTheDocument()
  })
})
