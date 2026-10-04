import type { CardData } from '../../../../types/types'

type RemoveCardProps = {
  card: CardData
  handleCardDelete: (card: CardData) => Promise<void>
}

export default function RemoveCard({
  card,
  handleCardDelete,
}: RemoveCardProps): React.JSX.Element {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()
    void handleCardDelete(card)
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  )
}
