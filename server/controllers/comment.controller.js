import { CommentModel } from "../models/Comment.js";
import { customError } from "../utils/customError.js";

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({})
      .populate({ path: "userId", select: "-password" })
      .populate({ path: "blogId" })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByBlogId = async (req, res, next) => {
  const { blogId } = req.params;
  const findBlog = await CommentModel.findOne({ blogId });
  if (!findBlog) {
    return customError(400, res, "blog with this id doesn't found");
  }
  try {
    const comments = await CommentModel.find({ blogId })
      .populate({ path: "userId", select: "-password" })
      .populate({ path: "blogId" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  const { comment } = req.body;
  const { blogId } = req.params;
  if (!comment || comment === "") {
    return customError(400, res, "comment field required");
  }
  try {
    const newComment = await CommentModel.create({
      blogId: blogId,
      userId: req.userInfo.userId,
      comment,
    });
    return res.status(201).json({
      success: true,
      msg: "comment added successfully",
      newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  // console.log(id);
  const { userId } = req.userInfo;
  console.log(userId);

  try {
    const comment = await CommentModel.findById(commentId).populate({
      path: "userId",
      select: "-password",
    });

    if (comment.userId._id.toString() !== userId) {
      return customError(401, res, "you are not permitted to do this action");
    }
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    return res.status(200).json({
      success: true,
      msg: "comment deleted",
      deletedComment,
    });
  } catch (error) {
    next(error);
  }
};
