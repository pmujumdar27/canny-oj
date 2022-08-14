import { createSlice } from "@reduxjs/toolkit";
import { getSubmissions } from "./submissionsActions";

const initialState = {
    loading: false,
    submissions: [],
    response: null,
    error: null,
    success: false
}

const submissionsSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {},
    extraReducers: {
        [getSubmissions.pending]: (state) => {
            state.loading = true;
        },
        [getSubmissions.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.response = payload;
            state.submissions = payload.data;
            state.success = true;
        },
        [getSubmissions.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.response = payload;
            state.success = false;
        }
    }
});

export default submissionsSlice.reducer;