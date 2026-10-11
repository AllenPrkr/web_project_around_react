import { useContext, useState } from 'react'
import CurrentUserContext from '../../../../contexts/CurrentUserContext'
import useAsyncAction from '../../../../hooks/useAsyncAction'
import useFormValidation from '../../../../hooks/useFormValidation'

const validationRules = {
  name: { label: 'El título', required: true, minLength: 2, maxLength: 30 },
  link: {
    label: 'El enlace de la imagen',
    required: true,
    type: 'url' as const,
  },
}

export default function NewCard(): React.JSX.Element {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const values = { name, link }
  const { errors, validateChangedField, validateField, validateForm } =
    useFormValidation(values, validationRules)
  const { isSubmitting, run, submitError } = useAsyncAction()

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (!validateForm()) return

    void run(
      () => handleAddPlaceSubmit({ name: name.trim(), link: link.trim() }),
      'No se pudo crear la tarjeta. Inténtalo de nuevo.',
    )
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <label className="popup__label" htmlFor="card-name">
          Título
        </label>
        <input
          id="card-name"
          className="popup__input popup__input_type_card-name"
          name="name"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
          type="text"
          value={name}
          aria-describedby="card-name-error"
          aria-invalid={Boolean(errors.name)}
          onBlur={() => validateField('name')}
          onChange={(event) => {
            setName(event.target.value)
            validateChangedField('name', event.target.value)
          }}
        />
        <span
          className={`popup__input-error ${errors.name ? 'popup__input-error_active' : ''}`}
          id="card-name-error"
        >
          {errors.name}
        </span>
      </div>
      <div className="popup__field">
        <label className="popup__label" htmlFor="card-url">
          Enlace de la imagen
        </label>
        <input
          id="card-url"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          aria-describedby="card-url-error"
          aria-invalid={Boolean(errors.link)}
          onBlur={() => validateField('link')}
          onChange={(event) => {
            setLink(event.target.value)
            validateChangedField('link', event.target.value)
          }}
        />
        <span
          className={`popup__input-error ${errors.link ? 'popup__input-error_active' : ''}`}
          id="card-url-error"
        >
          {errors.link}
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
        {isSubmitting ? 'Creando…' : 'Crear'}
      </button>
    </form>
  )
}
