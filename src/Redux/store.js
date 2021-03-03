import { createStore } from "redux";
import rootReducer from "./root-reducers";

export const store = createStore(rootReducer);

export default store;
