import { useContext } from 'react'
import CurrentUserContext from '../../../contexts/CurrentUserContext'
import useAsyncAction from '../../../hooks/useAsyncAction'
import type { CardData, PopupConfig } from '../../../types/types'
import ImagePopup from '../Popup/ImagePopup/ImagePopup'
import RemoveCard from '../Popup/RemoveCard/RemoveCard'

type CardProps = {
  card: CardData
  handleCardDelete: (card: CardData) => Promise<void>
  handleCardLike: (card: CardData) => Promise<void>
  handleOpenPopup: (popup: PopupConfig) => void
}

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleCardDelete, handleCardLike, handleOpenPopup } = props
  const { name, link } = card
  const { currentUser } = useContext(CurrentUserContext)
  const { isSubmitting: isLikePending, run, submitError } = useAsyncAction()

  const imageComponent: PopupConfig = {
    children: <ImagePopup card={card} />,
  }

  const deleteCardPopup: PopupConfig = {
    title: '¿Estás seguro?',
    children: <RemoveCard card={card} handleCardDelete={handleCardDelete} />,
  }

  const cardLikeButtonClassName = `card__like-button ${
    card.isLiked ? 'card__like-button_is-active' : ''
  }`

  return (
    <li className="card">
      <button
        aria-label={`Ampliar imagen de ${name}`}
        className="card__image-button"
        type="button"
        onClick={() => handleOpenPopup(imageComponent)}
      >
        <img className="card__image" src={link} alt={name} />
      </button>
      {card.owner === currentUser?._id && (
        <button
          aria-label={`Eliminar ${name}`}
          className="card__delete-button"
          type="button"
          onClick={() => handleOpenPopup(deleteCardPopup)}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label={card.isLiked ? `Quitar Me gusta de ${name}` : `Marcar ${name} como Me gusta`}
          aria-pressed={card.isLiked}
          type="button"
          className={cardLikeButtonClassName}
          disabled={isLikePending}
          onClick={() => {
            void run(
              () => handleCardLike(card),
              'No se pudo actualizar Me gusta.',
            )
          }}
        />
      </div>
      {submitError && (
        <p className="card__action-error" role="alert">
          {submitError}
        </p>
      )}
    </li>
  )
}
