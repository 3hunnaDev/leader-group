import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLayoutEffect, useRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './modal'

type ModalHarnessProps = {
  onClose?: () => void
}

type TestButtonProps = {
  children: string
  isVisible?: boolean
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

function TestButton({ children, isVisible = true }: TestButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const buttonElement = buttonRef.current

    if (!buttonElement) {
      return
    }

    Object.defineProperty(buttonElement, 'offsetWidth', {
      configurable: true,
      get: () => (isVisible ? 120 : 0),
    })

    Object.defineProperty(buttonElement, 'offsetHeight', {
      configurable: true,
      get: () => (isVisible ? 40 : 0),
    })

    Object.defineProperty(buttonElement, 'getClientRects', {
      configurable: true,
      value: () => (isVisible ? [createRect(120, 40)] : []),
    })
  }, [isVisible])

  return (
    <button ref={buttonRef} type="button">
      {children}
    </button>
  )
}

function ModalHarness({ onClose }: ModalHarnessProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    onClose?.()
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        ariaLabel="Demo modal"
        closeAnimationDurationMs={0}
      >
        <TestButton>Confirm</TestButton>
        <TestButton>Cancel</TestButton>
      </Modal>
    </>
  )
}

describe('Modal', () => {
  it('locks body scroll and focuses the first interactive element when opened', async () => {
    const user = userEvent.setup()

    render(<ModalHarness />)

    await user.click(screen.getByRole('button', { name: 'Open modal' }))

    expect(await screen.findByRole('dialog', { name: 'Demo modal' })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus()
    })
  })

  it('closes on Escape and restores focus to the trigger', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<ModalHarness onClose={onClose} />)

    const trigger = screen.getByRole('button', { name: 'Open modal' })
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Demo modal' })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Demo modal' })).not.toBeInTheDocument()
    })

    expect(onClose).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(trigger).toHaveFocus()
    })

    expect(document.body.style.overflow).toBe('')
  })

  it('closes on overlay interaction but ignores content clicks', () => {
    const onClose = vi.fn()

    render(
      <Modal isOpen onClose={onClose} ariaLabel="Overlay modal" closeAnimationDurationMs={0}>
        <TestButton>Inside</TestButton>
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Overlay modal' })
    fireEvent.mouseDown(dialog)
    expect(onClose).not.toHaveBeenCalled()

    fireEvent.mouseDown(dialog.parentElement as HTMLDivElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('skips hidden focus targets when choosing the initial focus', async () => {
    render(
      <Modal isOpen onClose={vi.fn()} ariaLabel="Focus modal" closeAnimationDurationMs={0}>
        <TestButton isVisible={false}>Hidden action</TestButton>
        <TestButton>Visible action</TestButton>
      </Modal>,
    )

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Visible action' })).toHaveFocus()
    })
  })
})
