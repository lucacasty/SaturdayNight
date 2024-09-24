import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    userGroups: [],
    groupIdeas: [],
  },
  reducers: {
    setUserGroups: (state, action) => {
      state.userGroups = action.payload
    },
    setGroupIdeas: (state, action) => {
      state.groupIdeas = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserGroups, setGroupIdeas } = groupSlice.actions

export default groupSlice.reducer