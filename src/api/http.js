import axios from "axios";

const http = axios.create({
    baseURL: "http://texnorus.uz/api",
    headers: {
        'Accept': 'application/json',
        Authorization: "Bearer " + window.localStorage.getItem('token'),
    }
})

export default http;