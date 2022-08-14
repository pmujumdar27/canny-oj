import { createSlice } from "@reduxjs/toolkit";
import { getSubmission } from "./submissionActions";

const initialState = {
    loading: false,
    submission: null,
    error: null,
    success: false
};

const submissionSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {},
    extraReducers: {
        [getSubmission.pending]: (state) => {
            state.loading = true;
        },
        [getSubmission.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.submission = payload.data;
            state.success = true;
        },
        [getSubmission.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
});

export default submissionSlice.reducer;