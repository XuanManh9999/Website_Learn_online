import { combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import showHideReducer from "./showHideReducer";


export const mainReducer = combineReducers({
    user: userReducer,
    course: courseReducer,
    state_show_hide: showHideReducer
})