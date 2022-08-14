import { createSlice } from "@reduxjs/toolkit";
import { getProblem } from "./problemActions";

const initialState = {
    loading: false,
    problem: null,
    error: null,
    success: false
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {},
    extraReducers: {
        [getProblem.pending]: (state) => {
            state.loading = true;
        },
        [getProblem.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.problem = payload;
            state.success = true;
        },
        [getProblem.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
});

export default problemSlice.reducer;