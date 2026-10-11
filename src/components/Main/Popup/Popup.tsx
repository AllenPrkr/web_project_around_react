import { useEffect, useId, useRef } from 'react'

type PopupProps = {
  title?: string
  children: React.ReactNode
  onClose: () => void
  isOpen: boolean
}

const focusableSelector = [
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function Popup({
  title,
  children,
  onClose,
  isOpen,
}: PopupProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [isOpen])

  return (
    <div
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        aria-label={title ? undefined : 'Vista ampliada de la imagen'}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={`popup__content ${
          !title ? 'popup__content_content_image' : ''
        }`}
        role="dialog"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          aria-label="Cerrar ventana"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && (
          <h2 className="popup__title" id={titleId}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}
