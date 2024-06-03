import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    page: 0,
  },
  reducers: {
    changePage: (state, value) => {
      state.page = value.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePage } = generalSlice.actions

export default generalSlice.reducer