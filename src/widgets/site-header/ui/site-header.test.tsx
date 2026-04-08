import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { SiteHeader } from './site-header'

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

describe('SiteHeader', () => {
  it('closes the mobile menu when the mobile layout is no longer rendered', async () => {
    const user = userEvent.setup()
    const originalGetComputedStyle = window.getComputedStyle.bind(window)
    let hideMobileLayout = false

    vi.spyOn(window, 'getComputedStyle').mockImplementation((element: Element) => {
      const computedStyle = originalGetComputedStyle(element)

      if (element instanceof HTMLElement && element.classList.contains('site-header-mobile')) {
        return {
          ...computedStyle,
          display: hideMobileLayout ? 'none' : 'block',
        } as CSSStyleDeclaration
      }

      return computedStyle
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <SiteHeader />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(await screen.findByRole('dialog', { name: 'Navigation menu' })).toBeInTheDocument()

    hideMobileLayout = true

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Navigation menu' })).not.toBeInTheDocument()
    })

    expect(
      screen.getByRole('button', { name: 'Open navigation', hidden: true }),
    ).toBeInTheDocument()
  })

  it('toggles the dark tone class based on overlapping dark sections', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <>
          <SiteHeader />
          <section data-testid="dark-zone" data-header-tone="dark">
            Dark zone
          </section>
        </>
      </MemoryRouter>,
    )

    const header = document.querySelector('.site-header')
    const darkZone = screen.getByTestId('dark-zone')

    if (!header) {
      throw new Error('Expected header element to be rendered')
    }

    mockElementRect(header, createRect({ top: 12, bottom: 72, right: 200 }))
    mockElementRect(darkZone, createRect({ top: 0, bottom: 160, right: 320 }))

    act(() => {
      window.dispatchEvent(new Event('load'))
    })

    await waitFor(() => {
      expect(header).toHaveClass('site-header--on-dark')
    })

    mockElementRect(darkZone, createRect({ top: 220, bottom: 360, right: 320 }))

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(header).not.toHaveClass('site-header--on-dark')
    })
  })
})
