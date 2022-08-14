import { createSlice } from "@reduxjs/toolkit";
import { getProblems } from "./problemsActions";

const initialState = {
    loading: false,
    problems: [],
    response: null,
    error: null,
    success: false
}

const problemsSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {},
    extraReducers: {
        [getProblems.pending]: (state) => {
            state.loading = true;
        },
        [getProblems.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.response = payload;
            state.problems = payload.data;
            state.success = true;
        },
        [getProblems.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.response = payload;
            state.success = false;
        }
    }
});

export default problemsSlice.reducer;