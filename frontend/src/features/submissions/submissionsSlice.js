import { createSlice } from "@reduxjs/toolkit";
import { getSubmissions, createSubmission } from "./submissionsActions";

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
        },
        [createSubmission.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createSubmission.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [createSubmission.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export default submissionsSlice.reducer;