import { takeEvery } from "redux-saga/effects";
import { LOGIN, LOGOUT } from "../actions/authActions";
import { loginUserHandler, logOutUserHandler } from "./authHandler";



export function* rootSaga() {
    yield takeEvery(LOGIN, loginUserHandler)
    yield takeEvery(LOGOUT, logOutUserHandler)
}