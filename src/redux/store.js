import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './generalSlice'
import userReducer from './userSlice'
import groupReducer from './groupSlice'
import ideaReducer from './ideaSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedGeneraldReducer = persistReducer(persistConfig, generalReducer)
const persistedUserdReducer = persistReducer(persistConfig, userReducer)
const persistedGroupReducer = persistReducer(persistConfig, groupReducer)
const persistedIdeaReducer = persistReducer(persistConfig, ideaReducer)

export const store = configureStore({
  reducer: {
    general: persistedGeneraldReducer,
    user: persistedUserdReducer,
    group: persistedGroupReducer,
    idea: persistedIdeaReducer,
  },
})

export const persistor = persistStore(store)