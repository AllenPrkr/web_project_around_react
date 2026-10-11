import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import CurrentUserContext from '../src/contexts/CurrentUserContext'
import NewCard from '../src/components/Main/Popup/NewCard/NewCard'
import Popup from '../src/components/Main/Popup/Popup'

describe('formulario de nueva tarjeta', () => {
  it('muestra errores accesibles y evita el envío inválido', async () => {
    const user = userEvent.setup()
    const handleAddPlaceSubmit = vi.fn().mockResolvedValue(undefined)

    render(
      <CurrentUserContext.Provider
        value={{
          currentUser: null,
          handleUpdateUser: vi.fn(),
          handleUpdateAvatar: vi.fn(),
          handleAddPlaceSubmit,
        }}
      >
        <NewCard />
      </CurrentUserContext.Provider>,
    )

    await user.click(screen.getByRole('button', { name: 'Crear' }))

    expect(handleAddPlaceSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Título')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(screen.getByText('El título es obligatorio.')).toBeInTheDocument()
    expect(
      screen.getByText('El enlace de la imagen es obligatorio.'),
    ).toBeInTheDocument()
  })

  it('envía valores válidos una sola vez y bloquea el botón', async () => {
    const user = userEvent.setup()
    let resolveRequest: (() => void) | undefined
    const handleAddPlaceSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRequest = resolve
        }),
    )

    render(
      <CurrentUserContext.Provider
        value={{
          currentUser: null,
          handleUpdateUser: vi.fn(),
          handleUpdateAvatar: vi.fn(),
          handleAddPlaceSubmit,
        }}
      >
        <NewCard />
      </CurrentUserContext.Provider>,
    )

    await user.type(screen.getByLabelText('Título'), 'Valle de Bravo')
    await user.type(
      screen.getByLabelText('Enlace de la imagen'),
      'https://example.com/valle.jpg',
    )
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    expect(handleAddPlaceSubmit).toHaveBeenCalledWith({
      name: 'Valle de Bravo',
      link: 'https://example.com/valle.jpg',
    })
    expect(screen.getByRole('button', { name: 'Creando…' })).toBeDisabled()

    resolveRequest?.()
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Crear' })).toBeEnabled(),
    )
  })
})

describe('ventana emergente accesible', () => {
  function PopupHarness(): React.JSX.Element {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button type="button" onClick={() => setIsOpen(true)}>
          Abrir
        </button>
        {isOpen && (
          <Popup title="Editar perfil" isOpen onClose={() => setIsOpen(false)}>
            <button type="button">Acción</button>
          </Popup>
        )}
      </>
    )
  }

  it('se anuncia como diálogo, cierra con Escape y devuelve el foco', async () => {
    const user = userEvent.setup()
    render(<PopupHarness />)

    const opener = screen.getByRole('button', { name: 'Abrir' })
    await user.click(opener)

    expect(screen.getByRole('dialog', { name: 'Editar perfil' })).toHaveAttribute(
      'aria-modal',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Cerrar ventana' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })
})
