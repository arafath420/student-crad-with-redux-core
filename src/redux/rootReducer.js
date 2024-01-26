import { combineReducers } from "redux";
import studentReducer from "./student/studentReducer";

const rootReducer = combineReducers({ student: studentReducer });

export default rootReducer;
