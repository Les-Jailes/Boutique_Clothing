import axios from "axios"

const connectionInstance = axios.create({
    baseURL: 'http://localhost:5000/'
})

export default connectionInstance