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
    reducers: {},
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            console.log("payload: ", payload);
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data.accessToken;
        },
        [userLogin.rejected]: (state, { payload }) => {
            console.log("payload: ", payload);
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data?.accessToken;
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
        }
    }
});

export default userSlice.reducer;