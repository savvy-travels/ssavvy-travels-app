import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

import userReducer from './userReducer'
import searchReducer from './searchReducer'
import locationReducer from './locationReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['locationReducer']
}

const rootReducer = combineReducers({
    locationReducer: locationReducer,
    userReducer: userReducer,
    searchReducer: searchReducer
})

export default persistReducer(persistConfig, rootReducer)