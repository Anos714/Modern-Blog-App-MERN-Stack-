import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios";
export const createNewBlog = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post("/blog/add", blogData);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/blog/all");

      return response.data.blogs;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blog/${blogId}`);
      console.log(response);
      return response.data.blog;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
