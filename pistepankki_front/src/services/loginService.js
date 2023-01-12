import axios from "axios"
const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api/login"

const login = async (username, password) => {
    const res = await axios.post(baseUrl, {username, password})
    return res.data
}

export const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.replace("/")
}

export default login