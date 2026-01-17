import { CommentModel } from "../models/Comment.js";
import { UserModel } from "../models/User.js";
import { customError } from "../utils/customError.js";

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
    const totalComments = await CommentModel.find({}).countDocuments();

    return res.status(200).json({
      success: true,
      comments,
      totalComments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return customError(400, res, "user doesn't found with this id");
    }

    return res.status(200).json({
      success: true,
      msg: "user deleted successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await CommentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return customError(400, res, "comment doesn't found with this id");
    }

    return res.status(200).json({
      success: true,
      msg: "comment deleted successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};
