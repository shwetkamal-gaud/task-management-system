import { User } from "firebase/auth";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETUSER = "SETUSER"

export const fetchUser = (payload: User) => {
    return ({
        type: LOGIN,
        payload
    })
}

export const logOuteUser = (payload: User) => {
    return (
        {
            type: LOGOUT,
            payload
        }
    )
}