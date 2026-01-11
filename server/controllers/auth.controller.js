import { customError } from "../utils/customError.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { generateTokenAndCookie } from "../utils/generateTokenAndCookie.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return customError(400, res, "All fields are required");
  }

  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) {
    return customError(400, res, "Username already taken");
  }

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return customError(400, res, "Email already exists");
  }

  const checkExistingUser = await UserModel.findOne({ email });
  if (checkExistingUser) {
    return customError(400, res, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newlyCreatedUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return generateTokenAndCookie(
      201,
      res,
      newlyCreatedUser,
      "User sign up successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return customError(400, res, "All fields are required");
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return customError(400, res, "User not exists");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return customError(401, res, "Invalid user credentials");
    }
    return generateTokenAndCookie(200, res, user, "User sign in successfully");
  } catch (error) {
    next(error);
  }
};

export const checkUserStatus = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
};
