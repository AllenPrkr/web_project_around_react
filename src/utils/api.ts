import type {
  AvatarFormData,
  CardData,
  CardFormData,
  UserData,
  UserFormData,
} from '../types/types'

interface ApiOptions {
  baseUrl: string
  headers: Record<string, string>
}

interface ApiError {
  message?: string
}

class Api {
  private readonly baseUrl: string
  private readonly headers: Record<string, string>

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.headers = { ...headers }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    })

    if (response.ok) {
      return (await response.json()) as T
    }

    let errorMessage = `Error ${response.status}: ${response.statusText}`

    try {
      const error = (await response.json()) as ApiError
      errorMessage = error.message ?? errorMessage
    } catch {
      // Algunas respuestas de error no incluyen un cuerpo JSON.
    }

    throw new Error(errorMessage)
  }

  public async getUserInfo(): Promise<UserData> {
    return await this.request<UserData>('/users/me')
  }

  public async getInitialCards(): Promise<CardData[]> {
    return await this.request<CardData[]>('/cards')
  }

  public async updateUserInfo(userData: UserFormData): Promise<UserData> {
    return await this.request<UserData>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  }

  public async updateAvatar(avatarData: AvatarFormData): Promise<UserData> {
    return await this.request<UserData>('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(avatarData),
    })
  }

  public async addCard(cardData: CardFormData): Promise<CardData> {
    return await this.request<CardData>('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    })
  }

  public async deleteCard(cardId: string): Promise<void> {
    return await this.request<void>(`/cards/${cardId}`, { method: 'DELETE' })
  }

  public async addLike(cardId: string): Promise<CardData> {
    return await this.request<CardData>(`/cards/${cardId}/likes`, {
      method: 'PUT',
    })
  }

  public async removeLike(cardId: string): Promise<CardData> {
    return await this.request<CardData>(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    })
  }

  public async changeLikeCardStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return await (isLiked ? this.removeLike(cardId) : this.addLike(cardId))
  }
}

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: '16df6e5c-3356-4b91-bafe-d3b8dbdc6af5',
    'Content-Type': 'application/json',
  },
})

export default api
