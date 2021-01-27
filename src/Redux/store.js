import { createStore, combineReducers } from 'redux'
import searchReducer from './searchReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    userReducer: userReducer,
    searchReducer: searchReducer
})


export default createStore(rootReducer)