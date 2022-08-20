import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/submissions";

export const getSubmissions = createAsyncThunk(
    'submissions/getSubmissions',
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
);

export const createSubmission = createAsyncThunk(
    'submissions/createSubmission',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                    'Content-type': 'multipart/form-data'
                },
            }

            const { data } = await axios.post(
                API_URL + '/submit',
                arg,
                config
            );

            console.log("Resp: ", data);

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