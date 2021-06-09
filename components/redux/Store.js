import { createStore, combineReducers } from "redux";
import Reducer from "./Reducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ Reducer });
const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
