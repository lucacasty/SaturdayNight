import { createSlice } from '@reduxjs/toolkit';
import { db } from './../config/fireBaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export const ideaSlice = createSlice({
  name: 'idea',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    addIdea: (state, action) => {
      addDoc(collection(db, "Ideas"), action.payload)
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
  },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addIdea } = ideaSlice.actions

export default ideaSlice.reducer