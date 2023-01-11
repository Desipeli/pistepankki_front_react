import { useEffect } from "react"


const LoginScreen = (props) => {
    useEffect(() => {
      document.title = 'Login'
    }, [])
    const { user, setUser } = props
    if (user) return <></>
  
    return (
      <>
      <LoginForm />
      </>
    )
  }
  
  const LoginForm = () => {
    const login = (event) => {
        event.preventDefault()
        console.log(event)
    }
    return (
    <div id="login-frame">
      <form id="login-form" onSubmit={login}>
        <div className="login-form-row">
        <label htmlFor="input-username">Username</label>
        <input id="input-username" type="text"></input>
        </div>
        <div className="login-form-row">
        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password"></input>
        </div>
        
        <input type="submit" text="login"></input>
      </form>
      </div>
    )
  }

  export default LoginScreen