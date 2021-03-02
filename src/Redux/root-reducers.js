import { combineReducers } from "redux";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  locationReducer: locationReducer,
  userReducer: userReducer,
});

export default rootReducer;
