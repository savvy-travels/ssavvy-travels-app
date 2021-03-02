import { combineReducers } from "redux";

import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  locationReducer: locationReducer,
  userReducer: userReducer,
  searchReducer: searchReducer,
});

export default rootReducer;
