import { Router } from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentsByBlogId,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const router = Router();

router.get("/all", getAllComments);
router.get("/:blogId", getCommentsByBlogId);
router.post("/add/:blogId", isAuthenticated, addComment);
router.delete("/delete/:commentId", isAuthenticated, deleteComment);

export const commentRouter = router;
