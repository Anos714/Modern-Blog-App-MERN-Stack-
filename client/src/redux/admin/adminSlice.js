import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  showAllComments,
  showAllUsers,
} from "../thunks/adminThunk";

const initialState = {
  users: null,
  user: null,
  comments: null,
  error: null,
  loading: true,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(showAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(showAllComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(showAllComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
