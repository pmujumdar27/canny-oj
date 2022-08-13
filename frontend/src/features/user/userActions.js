import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/users";

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ username, email, password }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            await axios.post(
                API_URL + '/signup',
                { username, email, password },
                config
            )
        }
        catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                API_URL + '/login',
                { email, password },
                config
            )
            
            localStorage.setItem('userToken', data.data.accessToken);

            return data;
        }
        catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.get(
                API_URL,
                config
            )

            return data;
        }
        catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue(error.message);
            }
        }
    }
)