import dispatcher from "../utils/appDispatcher"
import actionTypes from "./actionTypes";
import { getFavoritesFetch } from "../hooks/useFavoritesFetch";




export function changeFavorite(favorite) {
    dispatcher.dispatch({
        actionTypes: actionTypes.CHANGE_FAVORITES,
        favorite: favorite,
    });
}

export function UpdateFavorites() {
    dispatcher.dispatch({
        actionTypes: actionTypes.UPDATE_FAVORITES,
        favorite: getFavoritesFetch(),
    });
}


export function userLogout() {
    dispatcher.dispatch({
        actionTypes: actionTypes.LOGOUT_USER,
    });
}


  
  
  

//     function storageFavorites() {
//       if (!favorites) {
//         let userFavorites = userStore.getUser() !== null ? fetchFavorites() : [];
//         const localFavorites = JSON.parse(localStorage.getItem('favorites'));
//         setFavorits(Array.from(new Set([...localFavorites,...userFavorites])));
//       }
//       else {
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//       }
//     }
  
//     return { favorites, setFavorits };
//   };
  




// export const useFavoritesFetch = () => {
//   const [favorites, setFavorits] = useState();



//   useEffect(() => {
//     storageFavorites();
//   }, [favorites]);

//   async function storageFavorites() {
//     if (!favorites){
//         setFavorits(JSON.parse(localStorage.getItem('favorites')||[]))
//     }
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }

//   return { favorites,setFavorits};
// };
