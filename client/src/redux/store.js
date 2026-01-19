import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import blogReducer from "./blogs/blogSlice";
import adminReducer from "./admin/adminSlice";
import commentReducer from "./blogs/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    admin: adminReducer,
    comment: commentReducer,
  },
});
