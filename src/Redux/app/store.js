import  {configureStore} from "@reduxjs/toolkit"
import { rootReducer } from "../rootReducer"
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
const persistRootReducer= combineReducers(rootReducer)

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, persistRootReducer);
export const store = configureStore({reducer:persistedReducer})
export const persistor = persistStore(store)

