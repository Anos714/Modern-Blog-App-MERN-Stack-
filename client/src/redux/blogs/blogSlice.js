import { createSlice } from "@reduxjs/toolkit";
import { createNewBlog, fetchBlogs } from "../thunks/blogThunks";

const initialState = {
  blogs: [],
  blog: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload.blog);
        state.message = "Blog created successfully!";
      })
      .addCase(createNewBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
