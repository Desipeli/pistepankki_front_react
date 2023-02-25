import { useEffect, useState } from 'react'
import login from '../services/loginService'
import { logout } from '../services/loginService'

const LoginScreen = (props) => {
  useEffect(() => {
    document.title = 'Login'
  }, [])
  const { user, setUser, setTimedMessage } = props
  if (user) {
    return <div>Logged in as {user.username}</div>
  }

  return (
    <>
      <LoginForm setUser={setUser} setTimedMessage={setTimedMessage} />
    </>
  )
}

const LoginForm = (props) => {
  const { setUser, setTimedMessage } = props
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login(usernameInput, passwordInput)
      const saveUser = {
        username: user.username,
        token: `bearer ${user.token}`,
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(saveUser))
      setUser(saveUser)
    } catch (error) {
      console.error(error)
      setTimedMessage(error.response.data.error, 5000)
    }
  }
  return (
    <div className="form-frame">
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            value={usernameInput}
            onChange={({ target }) => setUsernameInput(target.value)}
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            value={passwordInput}
            onChange={({ target }) => setPasswordInput(target.value)}
          />
        </fieldset>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export const LogOut = () => {
  logout()
}

export default LoginScreen
