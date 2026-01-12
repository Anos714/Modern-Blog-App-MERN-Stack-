import { customError } from "../utils/customError.js";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { generateTokenAndCookie } from "../utils/generateTokenAndCookie.js";
import { imagekit } from "../config/imageKit.js";

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

  try {
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return customError(400, res, "Username already taken");
    }

    const checkExistingUser = await UserModel.findOne({ email });
    if (checkExistingUser) {
      return customError(400, res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

export const checkUserStatus = (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { displayName, email, PhotoUrl } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return generateTokenAndCookie(
        200,
        res,
        user,
        "User google sign in successfully"
      );
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = await UserModel.create({
        username:
          displayName.split(" ").join("") +
          Math.random().toString(36).slice(-4).toLowerCase(),
        email,
        password: hashedPassword,
        avatar: PhotoUrl,
      });

      return generateTokenAndCookie(
        201,
        res,
        newUser,
        "User google sign up successfully"
      );
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      success: true,
      msg: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (req.userInfo.userId !== id) {
    return customError(403, res, "Your are forbidden to delete this user");
  }

  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return customError(400, res, "User with this id dosen't exists");
    }

    return res.status(200).json({
      success: true,
      msg: "User account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const { id } = req.params;
  const imageFile = req.file;

  if (req.userInfo.userId !== id) {
    return customError(403, res, "Your are forbidden to update this user");
  }

  if (username) {
    if (username.length < 3) {
      return customError(
        400,
        res,
        "Username must be atleast 3 characters long"
      );
    }
  }

  if (password) {
    if (password.length < 8) {
      return customError(
        400,
        res,
        "Password must be atleast 8 characters long"
      );
    }
    req.body.password = await bcrypt.hash(password, 10);
  }

  if (imageFile) {
    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/user-avatar",
    });

    const imageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "auto" },
      ],
    });

    req.file = imageURL;
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        avatar: req.file,
        password,
      },
      { new: true }
    );
    if (!user) {
      return customError(400, res, "User with this id dosen't exists");
    }

    return res.status(200).json({
      success: true,
      msg: "User account updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
