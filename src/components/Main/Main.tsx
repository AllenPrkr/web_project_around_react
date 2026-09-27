import { useState } from 'react'
import type { CardData, PopupConfig } from '../../types/types'
import avatar from '../../images/avatar.jpg'
import Card from './Card/Card'
import EditAvatar from './Popup/EditAvatar/EditAvatar'
import EditProfile from './Popup/EditProfile/EditProfile'
import NewCard from './Popup/NewCard/NewCard'
import Popup from './Popup/Popup'

const cards: CardData[] = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
]

console.log(cards)

function Main(): React.JSX.Element {
  const [popup, setPopup] = useState<PopupConfig | null>(null)

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

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig)
  }

  function handleClosePopup(): void {
    setPopup(null)
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
          <img className="profile__image" src={avatar} alt="Avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">Explorador</p>
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
