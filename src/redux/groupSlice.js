import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    userGroups: [],
  },
  reducers: {
    setUserGroups: (state, action) => {
      state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = groupSlice.actions

export default groupSlice.reducer