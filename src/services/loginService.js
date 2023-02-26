import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../config'
const baseUrl = REACT_APP_BACKEND_URL + '/api/login'

const login = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password })
  return res.data
}

export const logout = () => {
  window.localStorage.removeItem('loggedUser')
  window.location.replace('/')
}

export default login
