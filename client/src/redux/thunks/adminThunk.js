import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios";

export const showAllUsers = createAsyncThunk(
  "admin/showAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
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

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
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
