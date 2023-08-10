import { combineReducers } from "redux";
import nightModeReducer from "./nightModeReducer"
import authReducer from "./authReducer";

const reducers = combineReducers({
    darkMode: nightModeReducer,
    auth: authReducer
})

export default reducers;