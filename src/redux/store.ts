import { configureStore, combineReducers } from '@reduxjs/toolkit';

import  mainReducer  from './reducers/reducer';


const rootReducer = combineReducers({
    main: mainReducer,
});



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
            immutableCheck: process.env.NODE_ENV !== 'production',
        })
}
);


export type RootState = ReturnType<typeof rootReducer>;
export default store;
