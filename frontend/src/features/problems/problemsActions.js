import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/problems";

export const getProblems = createAsyncThunk(
    'problems/getProblems',
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

export const createProblem = createAsyncThunk(
    'problems/createProblem',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                    'Content-type': 'multipart/form-data'
                },
            }

            console.log("Arg: ", arg);

            const { data } = await axios.post(
                API_URL,
                arg,
                config
            )

            console.log("Response: ", data);

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