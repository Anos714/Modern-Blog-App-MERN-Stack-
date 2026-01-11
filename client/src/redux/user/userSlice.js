import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios";

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/status");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const initialState = {
  currentUser: null,
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.error = null;
      })

      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
      });
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  signinStart,
  signinSuccess,
  signinFailure,
} = userSlice.actions;
export default userSlice.reducer;
