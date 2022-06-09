import axios from "axios";

const API = axios.create({
    baseURL: 'https://api.exchangerate.host'
})

export default API