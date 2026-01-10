import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {},
    email: {},
    password: {},
    role: {},
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
