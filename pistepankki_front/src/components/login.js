import { useEffect, useState } from "react"
import login from "../services/loginService"


const LoginScreen = (props) => {
    useEffect(() => {
      document.title = 'Login'
    }, [])
    const { user, setUser } = props
    if (user) {
      console.log("Kirjautunut", user)
      return (
        <div>
          Logged in as {user}
        </div>
      ) 
    } 

    return (
      <>
      <LoginForm setUser={setUser}/>
      </>
    )
  }
  
  const LoginForm = (props) => {
    const { setUser } = props
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await login(usernameInput, passwordInput)
          const saveUser = {
            username: user.username,
            token: `bearer ${user.token}`
          }
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(saveUser)
          )
          setUser(saveUser.username)
        } catch (exception) {
          console.error(exception)
        }
        

    }
    return (
    <div id="login-frame">
      <form id="login-form" onSubmit={handleLogin}>
        <div className="login-form-row">
        <label htmlFor="input-username">Username</label>
        <input 
          id="input-username"
          type="text"
          value={usernameInput}
          onChange={({ target }) => setUsernameInput(target.value)}/>
        </div>
        <div className="login-form-row">
        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          value={passwordInput}
          onChange={({ target }) => setPasswordInput(target.value)}/>
        </div>
        
        <input type="submit" text="login"></input>
      </form>
      </div>
    )
  }

  export default LoginScreen