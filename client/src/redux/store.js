import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import blogReducer from "./blogs/blogSlice";
import adminReducer from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    admin: adminReducer,
  },
});
