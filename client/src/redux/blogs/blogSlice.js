import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios";

export const createNewBlog = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post("/blog/add", blogData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

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
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
