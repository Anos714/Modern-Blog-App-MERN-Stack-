import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  laoding: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.laoding = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.laoding = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = userSlice.actions;
export default userSlice.reducer;
