import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../config/fireBaseConfig';
import { collection, query, where, limit, getDocs} from 'firebase/firestore';

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
    let items = querySnapshot[0].data();
    return items;
  },
)

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: null,
    mail: null,
    dateOfBirth: null,
    username: null,
    password: null,
    loading: null
  },
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.mail = action.payload.mail;
      state.username = action.payload.username;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.password = action.payload.password;
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
        state.mail = action.payload.mail;
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
export const { setLogin } = loginSlice.actions

export default loginSlice.reducer