// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser:(state,action)=>{
      state.userData = null
    }
  },
});

export const { setUser,clearUser } = userSlice.actions;
export default userSlice.reducer;
