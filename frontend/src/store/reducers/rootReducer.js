import { combineReducers } from "redux";
import problemReducer from "./problemReducer";
import loggedReducer from "./loggedReducer";
import counterReducer from "./counterReducer";

const rootReducer = combineReducers({
    problems: problemReducer,
    counter: counterReducer,
    logged: loggedReducer
});

export default rootReducer;