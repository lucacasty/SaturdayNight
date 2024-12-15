import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    page: 0,
    groupSelected: null,
    loginError: null,
    selectedDay: null,
    calendarShown: false,
    modalIdeaOpen: false,
    modalGroupOpen: false
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
    setCalendarShown: (state, value) => {
      state.calendarShown = value.payload
    },
    setLoginerror: (state, value) => {
      state.loginError = value.payload
    },
    setIdeaModalState: (state, value) => {
      state.modalIdeaOpen = value.payload
    },
    setGroupModalState: (state, value) => {
      state.modalGroupOpen = value.payload
    },
    closeAllModals: (state) => {
      state.modalIdeaOpen = false
      state.modalGroupOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePage, changeSelectedGroup, changeSelectedDay, setCalendarShown, setLoginerror, setIdeaModalState, setGroupModalState, closeAllModals} = generalSlice.actions

export default generalSlice.reducer