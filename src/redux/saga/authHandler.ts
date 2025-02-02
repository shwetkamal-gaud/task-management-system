import { SagaIterator } from "redux-saga";
import { Auth, onAuthStateChanged, signOut, User, } from "firebase/auth";
import { call, put } from "redux-saga/effects";
import { LOGOUT, SETUSER } from "../actions/authActions";

const getAuthUser = (auth: Auth): Promise<User | null> => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => resolve(user));
    });
}

const signOutUser = (auth: Auth): Promise<void> => {
    return signOut(auth)
}

export function* loginUserHandler(action: { type: string, payload: Auth }): SagaIterator {
    try {

        const user: User | null = yield call(getAuthUser, action.payload);
        yield put({ type: SETUSER, payload: user });
    } catch (e) {
        console.log(e)
    }
}

export function* logOutUserHandler(action: { type: string, payload: Auth }): SagaIterator {
    try {
        yield call(signOutUser, action.payload)
        yield put({ type: LOGOUT, payload: null })
    }
    catch (e) {
        console.log(e)
    }

}