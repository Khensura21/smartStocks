import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes"
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/auth/jwt/${type}`, userData).then(
                ({ token, ...user }) => {
                    localStorage.setItem("jwToken", token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError()); // if theyre any prev errs, remove them
                    resolve(); //indicates theat the API call succeeded
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); //indicate the API call failed
                })
        })

    }
}
