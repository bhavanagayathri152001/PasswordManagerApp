import './App.css'

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppItem from './components/AppItem/index'

const backgroundColors = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    isShow: true,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsDetailsList: [],
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const randomNumber = Math.ceil(Math.random() * backgroundColors.length - 1)
    const bgColor = backgroundColors[randomNumber]

    const newPassword = {
      id: uuidv4(),
      title: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialBgColor: bgColor,
    }

    this.setState(prevState => ({
      passwordsDetailsList: [...prevState.passwordsDetailsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  deleteBtn = id => {
    const {passwordsDetailsList} = this.state
    this.setState({
      passwordsDetailsList: passwordsDetailsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  noPasswordView = () => (
    <div className="no-password-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-image"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  getPasswordsDetailsList = () => {
    const {passwordsDetailsList, isShow, searchInput} = this.state
    const filteredPasswordResults = passwordsDetailsList.filter(eachPassword =>
      eachPassword.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const filteredPasswordResultsLength = filteredPasswordResults.length

    if (filteredPasswordResultsLength > 0) {
      return (
        <ul className="ul-container">
          {filteredPasswordResults.map(eachPassword => (
            <AppItem
              passwordDetails={eachPassword}
              deleteBtn={this.deleteBtn}
              key={eachPassword.id}
              isShow={isShow}
            />
          ))}
        </ul>
      )
    }
    return this.noPasswordView()
  }

  onChangeShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  render() {
    const {
      passwordsDetailsList,
      usernameInput,
      passwordInput,
      websiteInput,
    } = this.state

    const passwordDetailsListLength = passwordsDetailsList.length

    return (
      <div className="bg-container">
        <div className="password-manager-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="app-container">
          <div className="password-manager-top-container">
            <div className="add-password-container">
              <div className="heading-and-inputs-container">
                <h1 className="add-password-heading">Add New Password</h1>
                <form onSubmit={this.onAddNewPassword}>
                  <div className="input-container">
                    <button type="button" className="icon-button">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                        alt="website"
                        className="icons"
                      />
                    </button>
                    <input
                      type="text"
                      placeholder="Enter Website"
                      className="input-text"
                      onChange={this.onChangeWebsite}
                      value={websiteInput}
                    />
                  </div>
                  <div className="input-container">
                    <button type="button" className="icon-button">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                        alt="username"
                        className="icons"
                      />
                    </button>
                    <input
                      type="text"
                      className="input-text"
                      placeholder="Enter Username"
                      onChange={this.onChangeUsername}
                      value={usernameInput}
                    />
                  </div>
                  <div className="input-container">
                    <button type="button" className="icon-button">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                        alt="password"
                        className="icons"
                      />
                    </button>
                    <input
                      type="password"
                      className="input-text"
                      placeholder="Enter password"
                      onChange={this.onChangePassword}
                      value={passwordInput}
                    />
                  </div>
                  <div className="add-button-container">
                    <button type="submit" className="add-button">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="password-manager-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>
          </div>

          <div className="password-manager-bottom-container">
            <div className="password-count-search-container">
              <div className="password-count-container">
                <h1 className="password-heading">Your Passwords</h1>
                <p className="password-count">{passwordDetailsListLength}</p>
              </div>
              <div className="input-container">
                <button type="button" className="search-icon-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="icons"
                  />
                </button>
                <input
                  type="search"
                  className="search-input-text"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="show-password-container">
              <input
                id="check"
                type="checkbox"
                className="checkbox"
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="check" className="show-password-text">
                Show Passwords
              </label>
            </div>
            {passwordDetailsListLength > 0
              ? this.getPasswordsDetailsList()
              : this.noPasswordView()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
