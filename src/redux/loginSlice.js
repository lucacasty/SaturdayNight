import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../config/fireBaseConfig';
import { collection, query, where, limit, getDocs} from 'firebase/firestore';
import { PURGE } from "redux-persist";

const userColletionRef = collection(db, 'Users');

export const fetchUserByMail = createAsyncThunk(
  'login/fetchUserByMail',
  async (userMail, thunkAPI) => {
    const q = query(
      userColletionRef,
      where('mail', '==', userMail),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    let items = querySnapshot.docs[0].data();
    items.id = querySnapshot.docs[0].id;
    return items;
  },
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authProvider: null,
    email: null,
    username: null,
    uid: null,
    loading: null,
    userId: null,
    profilePic: null
  },
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      state.authProvider = action.payload.authProvider;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.userId = action.payload.id;
      state.profilePic = action.payload.profilePic;
    },
    storeLogout: (state, action) => {
      PURGE();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByMail.pending, (state, action) => {
        // is loading = true
        state.loading = 'loading';
      })
      .addCase(fetchUserByMail.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.password = action.payload.password;
      })
      .addCase(fetchUserByMail.rejected, (state, action) => {
        state.loading = 'idle'
      })
  },
})

// Action creators are generated for each case reducer function
export const { setLogin,storeLogout } = loginSlice.actions

export default loginSlice.reducer