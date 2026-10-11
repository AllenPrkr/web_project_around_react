import { useCallback, useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { getErrorMessage } from '../hooks/useAsyncAction'
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

type Feedback = {
  type: 'error' | 'success'
  message: string
}

async function getInitialData(): Promise<[UserData, CardData[]]> {
  return await Promise.all([api.getUserInfo(), api.getInitialCards()])
}

function App(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [cards, setCards] = useState<CardData[]>([])
  const [popup, setPopup] = useState<PopupConfig | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const loadInitialData = useCallback(async (): Promise<void> => {
    setIsInitialLoading(true)
    setFeedback(null)

    try {
      const [userData, initialCards] = await getInitialData()

      setCurrentUser(userData)
      setCards(initialCards)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(
          error,
          'No se pudieron cargar los datos. Inténtalo de nuevo.',
        ),
      })
    } finally {
      setIsInitialLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignoreResponse = false

    void getInitialData()
      .then(([userData, initialCards]) => {
        if (ignoreResponse) return
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((error: unknown) => {
        if (ignoreResponse) return
        setFeedback({
          type: 'error',
          message: getErrorMessage(
            error,
            'No se pudieron cargar los datos. Inténtalo de nuevo.',
          ),
        })
      })
      .finally(() => {
        if (!ignoreResponse) setIsInitialLoading(false)
      })

    return () => {
      ignoreResponse = true
    }
  }, [])

  const handleOpenPopup = useCallback((popupConfig: PopupConfig): void => {
    setPopup(popupConfig)
  }, [])

  const handleClosePopup = useCallback((): void => {
    setPopup(null)
  }, [])

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
      setFeedback({ type: 'success', message: 'Me gusta actualizado.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'No se pudo actualizar Me gusta.'),
      })
      throw error
    }
  }

  const handleCardDelete = async (card: CardData): Promise<void> => {
    try {
      await api.deleteCard(card._id)
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      )
      setPopup(null)
      setFeedback({ type: 'success', message: 'Tarjeta eliminada.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'No se pudo eliminar la tarjeta.'),
      })
      throw error
    }
  }

  const handleUpdateUser = async (userData: UserFormData): Promise<void> => {
    try {
      const updatedUser = await api.updateUserInfo(userData)
      setCurrentUser(updatedUser)
      setPopup(null)
      setFeedback({ type: 'success', message: 'Perfil actualizado.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'No se pudo actualizar el perfil.'),
      })
      throw error
    }
  }

  const handleUpdateAvatar = async (
    avatarData: AvatarFormData,
  ): Promise<void> => {
    try {
      const updatedUser = await api.updateAvatar(avatarData)
      setCurrentUser(updatedUser)
      setPopup(null)
      setFeedback({ type: 'success', message: 'Avatar actualizado.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'No se pudo actualizar el avatar.'),
      })
      throw error
    }
  }

  const handleAddPlaceSubmit = async (
    cardData: CardFormData,
  ): Promise<void> => {
    try {
      const newCard = await api.addCard(cardData)
      setCards((state) => [newCard, ...state])
      setPopup(null)
      setFeedback({ type: 'success', message: 'Tarjeta creada.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'No se pudo crear la tarjeta.'),
      })
      throw error
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
        {feedback && (
          <div
            className={`app-feedback app-feedback_type_${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            <span>{feedback.message}</span>
            {feedback.type === 'error' && currentUser === null && (
              <button
                className="app-feedback__retry"
                disabled={isInitialLoading}
                type="button"
                onClick={() => void loadInitialData()}
              >
                Reintentar
              </button>
            )}
            <button
              aria-label="Cerrar aviso"
              className="app-feedback__close"
              type="button"
              onClick={() => setFeedback(null)}
            >
              ×
            </button>
          </div>
        )}
        {isInitialLoading ? (
          <p className="app-loading" role="status">
            Cargando perfil y tarjetas…
          </p>
        ) : (
          <Main
            cards={cards}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
            popup={popup}
          />
        )}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
