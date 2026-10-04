import { useContext } from 'react'
import CurrentUserContext from '../../../contexts/CurrentUserContext'
import type { CardData, PopupConfig } from '../../../types/types'
import ImagePopup from '../Popup/ImagePopup/ImagePopup'
import RemoveCard from '../Popup/RemoveCard/RemoveCard'

type CardProps = {
  card: CardData
  handleCardDelete: (card: CardData) => Promise<void>
  handleCardLike: (card: CardData) => void
  handleOpenPopup: (popup: PopupConfig) => void
}

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleCardDelete, handleCardLike, handleOpenPopup } = props
  const { name, link } = card
  const { currentUser } = useContext(CurrentUserContext)

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
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      {card.owner === currentUser?._id && (
        <button
          aria-label="Eliminar tarjeta"
          className="card__delete-button"
          type="button"
          onClick={() => handleOpenPopup(deleteCardPopup)}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(card)}
        />
      </div>
    </li>
  )
}
