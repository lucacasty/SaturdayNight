import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    page: 0,
    groupSelected: null,
    loginError: null,
    selectedDay: null
  },
  reducers: {
    changePage: (state, value) => {
      state.page = value.payload
    },
    changeSelectedGroup: (state, value) => {
      state.groupSelected = value.payload
    },
    changeSelectedDay: (state, value) => {
      state.selectedDay = value.payload
    },
    setLoginerror: (state, value) => {
      state.loginError = value.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePage, changeSelectedGroup, changeSelectedDay, setLoginerror} = generalSlice.actions

export default generalSlice.reducer