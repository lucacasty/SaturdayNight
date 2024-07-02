import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    userGroups: [],
  },
  reducers: {
    setUserGroups: (state, action) => {
      state.userGroups = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserGroups } = groupSlice.actions

export default groupSlice.reducer