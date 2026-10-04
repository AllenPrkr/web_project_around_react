import { useContext, useState } from 'react'
import CurrentUserContext from '../../../../contexts/CurrentUserContext'

export default function NewCard(): React.JSX.Element {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault()
    void handleAddPlaceSubmit({ name, link })
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
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
          onChange={(event) => setName(event.target.value)}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          id="card-url"
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <span className="popup__error" id="card-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  )
}
