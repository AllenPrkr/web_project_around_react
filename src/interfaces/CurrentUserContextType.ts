import type { CardFormData } from './CardData'
import type { AvatarFormData, UserData, UserFormData } from './UserData'

export interface CurrentUserContextType {
  currentUser: UserData | null
  handleUpdateUser: (userData: UserFormData) => Promise<void>
  handleUpdateAvatar: (avatarData: AvatarFormData) => Promise<void>
  handleAddPlaceSubmit: (cardData: CardFormData) => Promise<void>
}
