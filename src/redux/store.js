import { configureStore, combineReducers } from '@reduxjs/toolkit'
import generalReducer from './generalSlice'
import loginReducer from './loginSlice'
import userReducer from './userSlice'
import groupReducer from './groupSlice'
import ideaReducer from './ideaSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

const combinedReducer = combineReducers({
    general: generalReducer,
    login: loginReducer,
    user: userReducer,
    group: groupReducer,
    idea: ideaReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
