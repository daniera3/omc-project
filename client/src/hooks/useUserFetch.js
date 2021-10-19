
import axios from "axios";



axios.defaults.baseURL = '/'

export function register(user) {
    return axios.post('user/register', (user),{withCredentials: true});
}

export const login = (user) => {
    return axios.post('user/login', (user),{withCredentials: true});

}


export const logout = () => {
    return axios.post('user/logout',{withCredentials: true});

}


export const getSession = () => {
    return axios.get('user/session',{withCredentials: true});

}

export const isAdmin = () => {
    return axios.post('user/isAdmin',{withCredentials: true});

}

export const getProfile = () => {
    return axios.post('user/details',{withCredentials: true});

}

export const getAllUsers = (token) => {
    return axios.post('user/getAllUsers',{'token':(token)},{withCredentials: true });

}


export const updateRole = (token) => {

    return axios.put('user/updateRole',token,{withCredentials: true });

}




