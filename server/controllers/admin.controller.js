import { CommentModel } from "../models/Comment.js";
import { UserModel } from "../models/User.js";

export const allUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    const totalUsersCount = await UserModel.find({}).countDocuments();
    const adminUserCount = await UserModel.find({
      role: "admin",
    }).countDocuments();
    return res.status(200).json({
      success: true,
      users,
      totalUsersCount,
      adminUserCount,
    });
  } catch (error) {
    next(error);
  }
};

export const allComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({})
      .populate({
        path: "userId",
        select: "-password",
      })
      .populate("blogId")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};
