import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../config'
const baseUrl = REACT_APP_BACKEND_URL + '/api/sports'

const comp = (a, b) => {
  if (a.name > b.name) {
    return -1
  }
  if (a.name < b.name) {
    return 1
  }
  return 0
}

const getSports = async () => {
  const res = await axios.get(baseUrl)
  const orderedSports = res.data.sort(comp)
  return res.data
}

export default getSports
