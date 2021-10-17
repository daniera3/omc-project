import { EventEmitter } from "events";
import dispatcher from "../utils/appDispatcher"
import actionTypes from "../actions/actionTypes";
import { putFavoritesFetch } from "../hooks/useFavoritesFetch";
import { userStore } from ".";


const CHANGE_EVENT = "change";
let _favorites = null;

const dicToString = e => {
    return JSON.stringify(e);
}

const stringToDic = e => {
    return JSON.parse(e);
}


class FavoritesStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        localStorage.setItem('favorites', JSON.stringify(_favorites));
        if (userStore.getUser() !== null)
            putFavoritesFetch().then(response => {
                if (response.status !== 200) {
                    alert("Error,cant save you`r change in you`r favorites list");
                }
            }
            )
        this.emit(CHANGE_EVENT);
    }

    getFavoritesArray() {
        return _favorites;
    }


}

const store = new FavoritesStore();

dispatcher.register((action) => {
    switch (action.actionTypes) {
        case actionTypes.UPDATE_FAVORITES:
            action.favorite ?
                action.favorite.then(response => {
                    if (response.status === 200) {
                        if (userStore.getUser !== null) {
                            const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                            const data = response.data ? (response.data) : [];

                            _favorites = Array.from(new Set([...data.map(dicToString), ...localFavorites.map(dicToString)])).map(stringToDic);
                        }
                        else {
                            _favorites = null;
                        }
                        store.emitChange();
                    }

                })
                : () => {
                    _favorites = null;
                    store.emitChange();
                }
            break;

        case actionTypes.CHANGE_FAVORITES:
            if (!_favorites) {
                _favorites = [action.favorite];
            }
            else if (_favorites.indexOf(action.favorite) !== -1) {
                _favorites = _favorites.filter(favorite => favorite !== action.favorite);
            }
            else {
                _favorites = [..._favorites, action.favorite];
            }
            store.emitChange();
            break;

        case actionTypes.LOGOUT_USER:
            _favorites = null;
            store.emitChange();
            break;

        default:
    }
});







export default store;




