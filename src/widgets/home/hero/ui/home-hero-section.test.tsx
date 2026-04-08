import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HomeHeroSection } from './home-hero-section'

function createMediaQueryList(query: string, matches = false): MediaQueryList {
  return {
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
}

function createRect(width: number, height: number): DOMRect {
  return {
    bottom: height,
    height,
    left: 0,
    right: width,
    toJSON: () => ({}),
    top: 0,
    width,
    x: 0,
    y: 0,
  } as DOMRect
}

describe('HomeHeroSection', () => {
  beforeEach(() => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => createMediaQueryList(query))
  })

  it('keeps the warranty ticker static when reduced motion is preferred', async () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) =>
      createMediaQueryList(query, query === '(prefers-reduced-motion: reduce)'),
    )

    render(
      <MemoryRouter initialEntries={['/']}>
        <HomeHeroSection />
      </MemoryRouter>,
    )

    const warrantyBar = document.querySelector('.home-hero__warranty-bar')
    const warrantyTrack = document.querySelector('.home-hero__warranty-track')

    if (!warrantyBar || !warrantyTrack) {
      throw new Error('Expected warranty ticker to be rendered')
    }

    await waitFor(() => {
      expect(warrantyBar).toHaveClass('home-hero__warranty-bar--ready')
    })

    expect(warrantyTrack).toHaveStyle({ transform: 'translate3d(0, 0, 0)' })
    expect(screen.getByRole('link', { name: /узнать больше/i })).toHaveAttribute(
      'href',
      '/#contacts',
    )
  })

  it('prepares the animated warranty ticker after layout metrics become available', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomeHeroSection />
      </MemoryRouter>,
    )

    const warrantyBar = document.querySelector<HTMLElement>('.home-hero__warranty-bar')
    const warrantyTrack = document.querySelector<HTMLElement>('.home-hero__warranty-track')
    const firstTickerLine = document.querySelector<HTMLElement>('.home-hero__warranty-line')

    if (!warrantyBar || !warrantyTrack || !firstTickerLine) {
      throw new Error('Expected warranty ticker elements to be rendered')
    }

    Object.defineProperty(firstTickerLine, 'getBoundingClientRect', {
      configurable: true,
      value: () => createRect(260, 48),
    })

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(warrantyBar).toHaveClass('home-hero__warranty-bar--ready')
    })

    expect(warrantyTrack.style.transform).toContain('translate3d(')
  })
})
