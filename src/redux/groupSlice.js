import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    userGroups: [],
    groupIdeas: [],
    groupIdeasInSelectedDay: [],
  },
  reducers: {
    setUserGroups: (state, action) => {
      state.userGroups = action.payload
    },
    setGroupIdeas: (state, action) => {
      state.groupIdeas = action.payload
    },
    setGroupIdeasInSelectedDay: (state, action) => {
      state.groupIdeasInSelectedDay = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserGroups, setGroupIdeas, setGroupIdeasInSelectedDay } = groupSlice.actions

export default groupSlice.reducer