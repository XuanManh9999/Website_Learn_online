import { combineReducers } from "redux";
import couterReducer from "./couterReducer";

export const mainReducer = combineReducers({
    couter: couterReducer
})