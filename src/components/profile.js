import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validatePassword, changePassword } from '../services/userService'

const Profile = (props) => {
  const { user, setTimedMessage } = props

  if (!user)
    return (
      <div>
        <Link to="/login">Log in to view profile</Link>
      </div>
    )

  return (
    <div>
      <ChangePassword setTimedMessage={setTimedMessage} user={user} />
    </div>
  )
}

const ChangePassword = (props) => {
  const { setTimedMessage, user } = props
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const handleChangePassword = async (event) => {
    event.preventDefault()
    const p1 = document.getElementById('input-p1').value
    const p2 = document.getElementById('input-p2').value
    const current = document.getElementById('input-current').value
    try {
      validatePassword(current, p1, p2)
    } catch (error) {
      setPasswordError(error.message)
      setTimedMessage(error.message, 5000)
      return
    }

    try {
      await changePassword(current, p1, p2, user)
      setTimedMessage('Password changed!', 5000)
      navigate('/logout')
    } catch (error) {
      setPasswordError(error.response.data.error)
      setTimedMessage(error.response.data.error, 5000)
    }
  }
  return (
    <div className="form-frame">
      <form onSubmit={handleChangePassword}>
        <fieldset>
          <label htmlFor="input-current">current password: </label>
          <input id="input-current" type="password"></input>
          <label htmlFor="input-p1">new password: </label>
          <input id="input-p1" type="password"></input>
          <label htmlFor="input-p2">new password: </label>
          <input id="input-p2" type="password"></input>
          <p>{passwordError}</p>
          <input type="submit"></input>
        </fieldset>
      </form>
    </div>
  )
}

export default Profile
