export default function EditProfile(): React.JSX.Element {
  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      noValidate
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          type="text"
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          id="profile-description"
          className="popup__input popup__input_type_description"
          name="description"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          type="text"
        />
        <span className="popup__error" id="profile-description-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}
