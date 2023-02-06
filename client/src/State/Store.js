import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers/reducers";
export const store = createStore(reducers, {}, applyMiddleware(thunk))