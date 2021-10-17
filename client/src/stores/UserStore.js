import { EventEmitter } from "events";
import dispatcher from "../utils/appDispatcher"
import actionTypes from "../actions/actionTypes";


const CHANGE_EVENT = "change";
let _user = null;

let _massege = '';

class UserStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        sessionStorage.setItem('user', JSON.stringify(_user))
        this.emit(CHANGE_EVENT);
    }

    getUser() {
        return _user;
    }
    getMassege() {
        return _massege;
    }


}

const store = new UserStore();

dispatcher.register((action) => {
    switch (action.actionTypes) {

        case actionTypes.REGISTER_USER:
            action.user.then(response => {
                if (response.status === 201 && response.data['username']) {
                    _user = response.data;
                    _massege = '';
                }
                else {
                    _user = null;
                    _massege = response.data;
                }
                store.emitChange();
            })
                .catch(() => {
                    _user = null;
                    _massege = "sorry,can`t rigester you now!!!";
                    store.emitChange();
                });
            break;

        case actionTypes.LOGIN_USER:
            action.user.then(response => {
                if (response.status === 200 && response.data['username']) {
                    _user = response.data;
                    _massege = '';
                }
                else {
                    _user = null;
                    _massege = response.data;
                }

                store.emitChange();
            })
                .catch(() => {
                    _user = null;
                    _massege = "Username and/or Password incorrect";
                    store.emitChange();
                })

            break;

        case actionTypes.LOGIN_USER_SESSIEN:
            _user = JSON.parse(window.sessionStorage.getItem('user'));
            store.emitChange();
            break;

        case actionTypes.LOGOUT_USER:
            sessionStorage.removeItem('user');
            _user = action.user;
            store.emitChange();
            break;
        default:


    }
});


export default store;