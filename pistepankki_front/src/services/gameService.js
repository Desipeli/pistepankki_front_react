import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/games'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}
