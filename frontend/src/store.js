import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import problemsReducer from './features/problems/problemsSlice';
import problemReducer from './features/problem/problemSlice';
import submissionsReducer from './features/submissions/submissionsSlice';
import submissionReducer from './features/submission/submissionSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        problems: problemsReducer,
        problem: problemReducer,
        submissions: submissionsReducer,
        submission: submissionReducer
    }
});

export default store;