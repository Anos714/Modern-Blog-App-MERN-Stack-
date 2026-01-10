import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username must be unique"],
      trim: true,
      minLength: [3, "username must be atleast 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
