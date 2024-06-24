import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './generalSlice'
import userReducer from './userSlice'
import groupReducer from './groupSlice'
import ideaReducer from './ideaSlice'

export default configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
    group: groupReducer,
    idea: ideaReducer,
  },
})