import './index.css'

const AppItem = props => {
  const {passwordDetails, deleteBtn, isShow} = props
  const {id, title, username, password, initialBgColor} = passwordDetails
  const initial = title[0].toUpperCase()

  const onDelete = () => {
    deleteBtn(id)
  }

  return (
    <li className="li-container">
      <div className={`initial-container ${initialBgColor}`}>
        <p>{initial}</p>
      </div>
      <div className="manage-password-item">
        <p className="manage-passwords-text">{title}</p>
        <p className="manage-passwords-text">{username}</p>
        <p className="manage-passwords-text">
          {isShow ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          ) : (
            password
          )}
        </p>
      </div>

      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default AppItem
