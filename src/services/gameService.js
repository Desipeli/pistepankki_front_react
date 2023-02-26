import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../config'
const baseUrl = REACT_APP_BACKEND_URL + '/api/games'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getGameById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export const deleteGame = async (id, user) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: user.token },
  })
  return res.data
}
