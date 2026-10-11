import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/components/App'
import type { CardData, UserData } from '../src/types/types'
import api from '../src/utils/api'

vi.mock('../src/utils/api', () => ({
  default: {
    getUserInfo: vi.fn(),
    getInitialCards: vi.fn(),
    updateUserInfo: vi.fn(),
    updateAvatar: vi.fn(),
    addCard: vi.fn(),
    deleteCard: vi.fn(),
    addLike: vi.fn(),
    removeLike: vi.fn(),
  },
}))

const userData: UserData = {
  _id: 'user-1',
  name: 'Ada Lovelace',
  about: 'Exploradora',
  avatar: 'https://example.com/avatar.jpg',
}

const cardData: CardData = {
  _id: 'card-1',
  name: 'Teotihuacán',
  link: 'https://example.com/teotihuacan.jpg',
  owner: 'user-1',
  createdAt: '2026-01-01T00:00:00.000Z',
  isLiked: false,
}

describe('flujos principales de la aplicación', () => {
  beforeEach(() => {
    vi.mocked(api.getUserInfo).mockResolvedValue(userData)
    vi.mocked(api.getInitialCards).mockResolvedValue([cardData])
  })

  it('carga los datos y guarda los cambios del perfil', async () => {
    const user = userEvent.setup()
    const updatedUser = {
      ...userData,
      name: 'Ada Byron',
      about: 'Programadora',
    }
    vi.mocked(api.updateUserInfo).mockResolvedValue(updatedUser)

    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Editar perfil' }))

    const nameInput = screen.getByLabelText('Nombre')
    const aboutInput = screen.getByLabelText('Acerca de mí')
    await user.clear(nameInput)
    await user.type(nameInput, 'Ada Byron')
    await user.clear(aboutInput)
    await user.type(aboutInput, 'Programadora')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    await waitFor(() =>
      expect(api.updateUserInfo).toHaveBeenCalledWith({
        name: 'Ada Byron',
        about: 'Programadora',
      }),
    )
    expect(
      await screen.findByRole('heading', { name: 'Ada Byron' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Perfil actualizado')
  })

  it('crea una tarjeta con datos válidos', async () => {
    const user = userEvent.setup()
    const newCard = {
      ...cardData,
      _id: 'card-2',
      name: 'Bacalar',
      link: 'https://example.com/bacalar.jpg',
    }
    vi.mocked(api.addCard).mockResolvedValue(newCard)

    render(<App />)
    await screen.findByRole('heading', { name: 'Ada Lovelace' })
    await user.click(screen.getByRole('button', { name: 'Agregar tarjeta' }))
    await user.type(screen.getByLabelText('Título'), 'Bacalar')
    await user.type(
      screen.getByLabelText('Enlace de la imagen'),
      'https://example.com/bacalar.jpg',
    )
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    expect(
      await screen.findByRole('heading', { name: 'Bacalar' }),
    ).toBeInTheDocument()
    expect(api.addCard).toHaveBeenCalledWith({
      name: 'Bacalar',
      link: 'https://example.com/bacalar.jpg',
    })
  })

  it('marca Me gusta y confirma la eliminación', async () => {
    const user = userEvent.setup()
    vi.mocked(api.addLike).mockResolvedValue({ ...cardData, isLiked: true })
    vi.mocked(api.deleteCard).mockResolvedValue(undefined)

    render(<App />)
    await screen.findByRole('heading', { name: 'Teotihuacán' })

    await user.click(
      screen.getByRole('button', {
        name: 'Marcar Teotihuacán como Me gusta',
      }),
    )
    await waitFor(() => expect(api.addLike).toHaveBeenCalledWith('card-1'))
    expect(
      screen.getByRole('button', {
        name: 'Quitar Me gusta de Teotihuacán',
      }),
    ).toHaveAttribute('aria-pressed', 'true')

    await user.click(
      screen.getByRole('button', { name: 'Eliminar Teotihuacán' }),
    )
    expect(
      screen.getByRole('dialog', { name: '¿Estás seguro?' }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Sí' }))

    await waitFor(() => expect(api.deleteCard).toHaveBeenCalledWith('card-1'))
    expect(
      screen.queryByRole('heading', { name: 'Teotihuacán' }),
    ).not.toBeInTheDocument()
  })
})
