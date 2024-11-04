import { combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";

export const mainReducer = combineReducers({
    user: userReducer,
    course: courseReducer
})