
import axios from "axios";



const baseURL = 'http://127.0.0.1:8000/user/'

export function register(user) {
    return axios.post(`${baseURL}register`, JSON.stringify(user));
}

export const login = (user) => {
    return axios.post(`${baseURL}login`, JSON.stringify(user));

}




