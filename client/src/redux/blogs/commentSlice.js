import { createSlice } from "@reduxjs/toolkit";
import { addComment, getCommentsByBlogId } from "../thunks/commentThunk";

const initialState = {
  comments: null,
  loading: true,
  error: null,
  message: "",
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByBlogId.pending, (state) => {
        state.loading = true;
        state.commentSlice = null;
      })
      .addCase(getCommentsByBlogId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(getCommentsByBlogId.rejected, (state, action) => {
        state.error = action.payload;
        state.comments = null;
        state.loading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
