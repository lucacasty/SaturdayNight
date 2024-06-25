import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    mail: '',
    dateOfBirth: '',
    username: '',
    ideas: []
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer