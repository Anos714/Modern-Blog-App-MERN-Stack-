import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import blogReducer from "./blogs/blogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});
