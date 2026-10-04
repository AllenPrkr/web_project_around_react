import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import type { CardData, PopupConfig } from '../../types/types'
import Card from './Card/Card'
import EditAvatar from './Popup/EditAvatar/EditAvatar'
import EditProfile from './Popup/EditProfile/EditProfile'
import NewCard from './Popup/NewCard/NewCard'
import Popup from './Popup/Popup'

type MainProps = {
  cards: CardData[]
  handleCardDelete: (card: CardData) => Promise<void>
  handleCardLike: (card: CardData) => void
  handleOpenPopup: (popup: PopupConfig) => void
  handleClosePopup: () => void
  popup: PopupConfig | null
}

function Main({
  cards,
  handleCardDelete,
  handleCardLike,
  handleOpenPopup,
  handleClosePopup,
  popup,
}: MainProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext)

  const editProfilePopup: PopupConfig = {
    title: 'Editar perfil',
    children: <EditProfile />,
  }

  const editAvatarPopup: PopupConfig = {
    title: 'Cambiar foto de perfil',
    children: <EditAvatar />,
  }

  const newCardPopup: PopupConfig = {
    title: 'Nuevo lugar',
    children: <NewCard />,
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <button
          aria-label="Cambiar avatar"
          className="profile__avatar-button"
          type="button"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardDelete={handleCardDelete}
              handleCardLike={handleCardLike}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  )
}

export default Main
