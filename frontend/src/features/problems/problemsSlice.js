import { createSlice } from "@reduxjs/toolkit";
import { getProblems, createProblem } from "./problemsActions";

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
        },
        [createProblem.pending]: (state) => {
            state.loading = true;
        },
        [createProblem.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [createProblem.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export default problemsSlice.reducer;