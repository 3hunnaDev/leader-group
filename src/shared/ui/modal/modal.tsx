import {
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  lockBodyScroll?: boolean;
  closeAnimationDurationMs?: number;
};

export function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  contentClassName,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockBodyScroll = true,
  closeAnimationDurationMs = 340,
}: ModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    let frameId = 0;
    let closeTimeoutId = 0;

    if (isOpen) {
      setIsRendered(true);
      frameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else if (isRendered) {
      setIsVisible(false);
      closeTimeoutId = window.setTimeout(() => {
        setIsRendered(false);
      }, Math.max(0, closeAnimationDurationMs));
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }
    };
  }, [isOpen, isRendered, closeAnimationDurationMs]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeClose);

    return () => {
      window.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isRendered || !lockBodyScroll) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isRendered, lockBodyScroll]);

  if (!isRendered) {
    return null;
  }

  const modalStateClass = isVisible ? "modal--open" : "modal--closed";
  const overlayClasses = ["modal", modalStateClass, overlayClassName]
    .filter(Boolean)
    .join(" ");
  const contentClasses = ["modal__content", modalStateClass, contentClassName]
    .filter(Boolean)
    .join(" ");

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={overlayClasses} onMouseDown={handleOverlayMouseDown}>
      <div
        className={contentClasses}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
