import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './generalSlice'
import loginReducer from './loginSlice'
import userReducer from './userSlice'
import groupReducer from './groupSlice'
import ideaReducer from './ideaSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedGeneralReducer = persistReducer(persistConfig, generalReducer)
const persistedLoginReducer = persistReducer(persistConfig, loginReducer)

export const store = configureStore({
  reducer: {
    general: persistedGeneralReducer,
    login: loginReducer,
    user: userReducer,
    group: groupReducer,
    idea: ideaReducer,
  },
})

export const persistor = persistStore(store)