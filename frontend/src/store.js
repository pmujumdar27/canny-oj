import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import problemsReducer from './features/problems/problemsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        problems: problemsReducer
    }
});

export default store;