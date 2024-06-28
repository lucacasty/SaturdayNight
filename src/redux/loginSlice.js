import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: 'cmg6ndDdTYkVVA47N4w9',
    mail: '',
    dateOfBirth: '',
    username:''
  },
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.mail = action.payload.mail;
      state.username = action.payload.mail;
      state.dateOfBirth = action.payload.dateOfBirth;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin } = loginSlice.actions

export default loginSlice.reducer