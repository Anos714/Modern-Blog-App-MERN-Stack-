import { UserModel } from "../models/User.js";

export const allUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}).select("-password");
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
