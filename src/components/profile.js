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

export default Profile

const ChangePassword = (props) => {
  const { setTimedMessage, user } = props
  const navigate = useNavigate()
  const handleChangePassword = () => {
    const p1 = document.getElementById('input-p1').value
    const p2 = document.getElementById('input-p2').value
    const current = document.getElementById('input-current').value
    try {
      validatePassword(current, p1, p2)
    } catch (error) {
      setTimedMessage(error.message, 5000)
      return
    }
    try {
      changePassword(current, p1, p2, user)
      setTimedMessage('Password changed!', 5000)
      navigate('/logout')
    } catch (error) {
      setTimedMessage(error.response.data.error)
    }
  }
  return (
    <div id="change-password">
      <label htmlFor="input-current">current password: </label>
      <input id="input-current" type="password"></input>
      <label htmlFor="input-p1">new password: </label>
      <input id="input-p1" type="password"></input>
      <label htmlFor="input-p2">new password: </label>
      <input id="input-p2" type="password"></input>
      <button onClick={handleChangePassword}>Change password</button>
    </div>
  )
}
