

import { favoriteStore, userStore } from "../stores";
import axios from "axios";



axios.defaults.baseURL =  '/';

export function getFavoritesFetch() {
  if (userStore.getUser() !== null) {
    return axios.get('favorites/getAllPerUser');
  }
}

export const putFavoritesFetch = () => {

  return axios.put('favorites/',{'favorites':favoriteStore.getFavoritesArray()});

}


