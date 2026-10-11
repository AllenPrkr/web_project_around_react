import { useContext, useState } from 'react'
import CurrentUserContext from '../../../../contexts/CurrentUserContext'
import useAsyncAction from '../../../../hooks/useAsyncAction'
import useFormValidation from '../../../../hooks/useFormValidation'

const validationRules = {
  name: { label: 'El nombre', required: true, minLength: 2, maxLength: 40 },
  description: {
    label: 'La descripción',
    required: true,
    minLength: 2,
    maxLength: 200,
  },
}

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser?.name || '')
  const [description, setDescription] = useState(currentUser?.about || '')
  const values = { name, description }
  const { errors, validateChangedField, validateField, validateForm } =
    useFormValidation(values, validationRules)
  const { isSubmitting, run, submitError } = useAsyncAction()

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!validateForm()) return

    void run(
      () =>
        handleUpdateUser({ name: name.trim(), about: description.trim() }),
      'No se pudo guardar el perfil. Inténtalo de nuevo.',
    )
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <label className="popup__label" htmlFor="profile-name">
          Nombre
        </label>
        <input
          id="profile-name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          type="text"
          value={name}
          aria-describedby="profile-name-error"
          aria-invalid={Boolean(errors.name)}
          onBlur={() => validateField('name')}
          onChange={(event) => {
            setName(event.target.value)
            validateChangedField('name', event.target.value)
          }}
        />
        <span
          className={`popup__input-error ${errors.name ? 'popup__input-error_active' : ''}`}
          id="profile-name-error"
        >
          {errors.name}
        </span>
      </div>
      <div className="popup__field">
        <label className="popup__label" htmlFor="profile-description">
          Acerca de mí
        </label>
        <input
          id="profile-description"
          className="popup__input popup__input_type_description"
          name="description"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          type="text"
          value={description}
          aria-describedby="profile-description-error"
          aria-invalid={Boolean(errors.description)}
          onBlur={() => validateField('description')}
          onChange={(event) => {
            setDescription(event.target.value)
            validateChangedField('description', event.target.value)
          }}
        />
        <span
          className={`popup__input-error ${errors.description ? 'popup__input-error_active' : ''}`}
          id="profile-description-error"
        >
          {errors.description}
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
