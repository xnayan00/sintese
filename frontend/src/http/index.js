import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7436",
    timeout: 1000,
});

export default instance