export default function EditAvatar(): React.JSX.Element {
  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      noValidate
    >
      <label className="popup__field">
        <input
          id="profile-avatar"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          type="url"
        />
        <span className="popup__error" id="profile-avatar-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}
