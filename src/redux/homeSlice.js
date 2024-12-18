import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'group',
  initialState: {
    allIdeas: [], // Tutte le idee del prog
    allIdeasUsers: [], // Lista di utenti che hanno fatto le idee del prog
  },
  reducers: {
    setAllIdeas: (state, action) => {
      state.allIdeas = action.payload;
    },
    setAllIdeasUsers: (state, action) => {
      state.allIdeasUsers = action.payload;
    },
  },
});

export const { setAllIdeas, setAllIdeasUsers } = homeSlice.actions;
export default homeSlice.reducer
