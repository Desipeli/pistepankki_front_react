import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/games'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getGameById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}
