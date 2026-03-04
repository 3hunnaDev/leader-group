import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  "[tabindex]:not([tabindex='-1'])",
].join(', ')

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => {
      if (element.getAttribute('aria-hidden') === 'true') {
        return false
      }

      return (
        element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0
      )
    },
  )
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  overlayClassName?: string
  contentClassName?: string
  contentId?: string
  ariaLabel?: string
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  lockBodyScroll?: boolean
  closeAnimationDurationMs?: number
}

export function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  contentClassName,
  contentId,
  ariaLabel,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockBodyScroll = true,
  closeAnimationDurationMs = 340,
}: ModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(isOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frameId = 0
    let visibilityFrameId = 0
    let closeTimeoutId = 0

    if (isOpen) {
      frameId = window.requestAnimationFrame(() => {
        setIsRendered(true)
        visibilityFrameId = window.requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else if (isRendered) {
      frameId = window.requestAnimationFrame(() => {
        setIsVisible(false)
      })
      closeTimeoutId = window.setTimeout(
        () => {
          setIsRendered(false)
        },
        Math.max(0, closeAnimationDurationMs),
      )
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      if (visibilityFrameId) {
        cancelAnimationFrame(visibilityFrameId)
      }

      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId)
      }
    }
  }, [isOpen, isRendered, closeAnimationDurationMs])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const contentElement = contentRef.current

      if (!contentElement) {
        return
      }

      const focusableElements = getFocusableElements(contentElement)

      if (focusableElements.length === 0) {
        event.preventDefault()
        contentElement.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      const isActiveInsideContent = activeElement ? contentElement.contains(activeElement) : false

      if (event.shiftKey) {
        if (!isActiveInsideContent || activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }

        return
      }

      if (!isActiveInsideContent || activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleModalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleModalKeyDown)
    }
  }, [isOpen, closeOnEsc, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const activeElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    lastFocusedElementRef.current = activeElement
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !isRendered) {
      return
    }

    let frameId = 0

    frameId = window.requestAnimationFrame(() => {
      const contentElement = contentRef.current

      if (!contentElement) {
        return
      }

      const focusableElements = getFocusableElements(contentElement)
      const firstFocusableElement = focusableElements[0]

      if (firstFocusableElement) {
        firstFocusableElement.focus()
        return
      }

      contentElement.focus()
    })

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [isOpen, isRendered])

  useEffect(() => {
    if (isOpen) {
      return
    }

    const lastFocusedElement = lastFocusedElementRef.current

    if (!lastFocusedElement) {
      return
    }

    let frameId = 0

    frameId = window.requestAnimationFrame(() => {
      if (document.contains(lastFocusedElement)) {
        lastFocusedElement.focus()
      }
      lastFocusedElementRef.current = null
    })

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isRendered || !lockBodyScroll) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isRendered, lockBodyScroll])

  if (!isRendered) {
    return null
  }

  const modalStateClass = isVisible ? 'modal--open' : 'modal--closed'
  const overlayClasses = ['modal', modalStateClass, overlayClassName].filter(Boolean).join(' ')
  const contentClasses = ['modal__content', modalStateClass, contentClassName]
    .filter(Boolean)
    .join(' ')

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.currentTarget === event.target) {
      onClose()
    }
  }

  return createPortal(
    <div className={overlayClasses} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={contentRef}
        id={contentId}
        className={contentClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
