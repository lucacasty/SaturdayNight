import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    page: 0,
    groupSelected: null,
  },
  reducers: {
    changePage: (state, value) => {
      state.page = value.payload
    },
    changeSelectedGroup: (state, value) => {
      state.groupSelected = value.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePage, changeSelectedGroup } = generalSlice.actions

export default generalSlice.reducer