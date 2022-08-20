import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/submissions";

export const getSubmission = createAsyncThunk(
    'submission/getSubmission',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { user } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${user.userToken}`,
                },
            }

            const { data } = await axios.get(
                API_URL + `/${arg}`,
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