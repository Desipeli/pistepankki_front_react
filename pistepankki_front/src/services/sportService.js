import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api/sports"

const getSports = async () =>{
    const res = await axios.get(baseUrl)
    return res.data
}

export default getSports