import dispatcher from "../utils/appDispatcher"
import actionTypes from "./actionTypes";
import  {register,login}  from "../hooks/useUserFetch";


export function userRegister(user) {

    dispatcher.dispatch({
        actionTypes: actionTypes.REGISTER_USER,
        user:register(user),

    });
}


export function userLogin(user) {
    dispatcher.dispatch({
        actionTypes: actionTypes.LOGIN_USER,
        user: login(user),
    });
}


export function userLogout() {
    dispatcher.dispatch({
        actionTypes: actionTypes.LOGOUT_USER,
        user: null,
    });

}


export function loginUserSessien() {
    dispatcher.dispatch({
        actionTypes: actionTypes.LOGIN_USER_SESSIEN,
    });

}