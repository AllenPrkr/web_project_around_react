import useAsyncAction from '../../../../hooks/useAsyncAction'
import type { CardData } from '../../../../types/types'

type RemoveCardProps = {
  card: CardData
  handleCardDelete: (card: CardData) => Promise<void>
}

export default function RemoveCard({
  card,
  handleCardDelete,
}: RemoveCardProps): React.JSX.Element {
  const { isSubmitting, run, submitError } = useAsyncAction()

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()
    void run(
      () => handleCardDelete(card),
      'No se pudo eliminar la tarjeta. Inténtalo de nuevo.',
    )
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      {submitError && (
        <p className="popup__submit-error" role="alert">
          {submitError}
        </p>
      )}
      <button
        className="button popup__button"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Eliminando…' : 'Sí'}
      </button>
    </form>
  )
}
