import { useContext, useState } from 'react'
import CurrentUserContext from '../../../../contexts/CurrentUserContext'
import useAsyncAction from '../../../../hooks/useAsyncAction'
import useFormValidation from '../../../../hooks/useFormValidation'

const validationRules = {
  avatar: {
    label: 'El enlace del avatar',
    required: true,
    type: 'url' as const,
  },
}

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext)
  const [avatar, setAvatar] = useState('')
  const { errors, validateChangedField, validateField, validateForm } =
    useFormValidation({ avatar }, validationRules)
  const { isSubmitting, run, submitError } = useAsyncAction()

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!validateForm()) return

    void run(
      () => handleUpdateAvatar({ avatar: avatar.trim() }),
      'No se pudo actualizar el avatar. Inténtalo de nuevo.',
    )
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <label className="popup__label" htmlFor="profile-avatar">
          Enlace del avatar
        </label>
        <input
          id="profile-avatar"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={avatar}
          aria-describedby="profile-avatar-error"
          aria-invalid={Boolean(errors.avatar)}
          onBlur={() => validateField('avatar')}
          onChange={(event) => {
            setAvatar(event.target.value)
            validateChangedField('avatar', event.target.value)
          }}
        />
        <span
          className={`popup__input-error ${errors.avatar ? 'popup__input-error_active' : ''}`}
          id="profile-avatar-error"
        >
          {errors.avatar}
        </span>
      </div>
      {submitError && (
        <p className="popup__submit-error" role="alert">
          {submitError}
        </p>
      )}
      <button
        className="button popup__button"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}
