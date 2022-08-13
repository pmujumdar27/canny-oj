import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, registerUser, userLogin } from "./userActions";

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null
;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data.accessToken;
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data?.accessToken;
            state.error = payload;
        },
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getUserDetails.pending]: (state) => {
            state.loading = true;
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;