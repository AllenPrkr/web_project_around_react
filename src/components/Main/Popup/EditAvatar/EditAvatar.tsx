import { useContext, useRef } from 'react'
import CurrentUserContext from '../../../../contexts/CurrentUserContext'

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext)
  const avatarRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (avatarRef.current) {
      void handleUpdateAvatar({ avatar: avatarRef.current.value })
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="profile-avatar"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          type="url"
          ref={avatarRef}
        />
        <span className="popup__error" id="profile-avatar-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}
