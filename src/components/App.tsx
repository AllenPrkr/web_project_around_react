import { useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
import type {
  AvatarFormData,
  CardData,
  CardFormData,
  PopupConfig,
  UserData,
  UserFormData,
} from '../types/types'
import api from '../utils/api'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

function App(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [cards, setCards] = useState<CardData[]>([])
  const [popup, setPopup] = useState<PopupConfig | null>(null)

  useEffect(() => {
    void (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ])

        setCurrentUser(userData)
        setCards(initialCards)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig)
  }

  function handleClosePopup(): void {
    setPopup(null)
  }

  const handleCardLike = async (card: CardData): Promise<void> => {
    try {
      const apiCall = card.isLiked
        ? api.removeLike(card._id)
        : api.addLike(card._id)
      const newCard = await apiCall

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardDelete = async (card: CardData): Promise<void> => {
    try {
      await api.deleteCard(card._id)
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      )
      setPopup(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateUser = async (userData: UserFormData): Promise<void> => {
    try {
      const updatedUser = await api.updateUserInfo(userData)
      setCurrentUser(updatedUser)
      setPopup(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateAvatar = async (
    avatarData: AvatarFormData,
  ): Promise<void> => {
    try {
      const updatedUser = await api.updateAvatar(avatarData)
      setCurrentUser(updatedUser)
      setPopup(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddPlaceSubmit = async (
    cardData: CardFormData,
  ): Promise<void> => {
    try {
      const newCard = await api.addCard(cardData)
      setCards((state) => [newCard, ...state])
      setPopup(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
          popup={popup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
