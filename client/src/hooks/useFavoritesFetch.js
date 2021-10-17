

import { favoriteStore, userStore } from "../stores";
import axios from "axios";



const baseURL = 'http://127.0.0.1:8000/favorites/'

export function getFavoritesFetch() {
  if (userStore.getUser() !== null) {
    const data = JSON.stringify(userStore.getUser());
    return axios.post(`${baseURL}getAllPerUser`, data);
  }
}

export const putFavoritesFetch = () => {
  let data =userStore.getUser() 
  data['favorites']= JSON.stringify(favoriteStore.getFavoritesArray());
  return axios.post(`${baseURL}`,  JSON.stringify(data));

}


