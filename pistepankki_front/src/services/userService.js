import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/users'

const getAllUsers = async () => {
  const users = await axios.get(baseUrl)
  return users.data.filter((u) => u.username !== 'deleted')
}

export default getAllUsers
