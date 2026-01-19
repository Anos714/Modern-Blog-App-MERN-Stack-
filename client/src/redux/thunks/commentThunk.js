import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios";

export const getCommentsByBlogId = createAsyncThunk(
  "comment/getCommentsByBlogId",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/comment/${blogId}`);
      console.log(response);
      return response?.data?.comments;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ blogId, data }, { rejectWithValue }) => {
    try {
      console.log(blogId);

      const response = await api.post(`/comment/add/${blogId}`, data);
      console.log(response);
      return response?.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);
