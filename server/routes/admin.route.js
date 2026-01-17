import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.moddleware.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import {
  allComments,
  allUsers,
  deleteComment,
  deleteUser,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", isAuthenticated, isAdmin, allUsers);
router.delete("/users/:userId", isAuthenticated, isAdmin, deleteUser);
router.get("/comments", isAuthenticated, isAdmin, allComments);
router.delete("/comments/:commentId", isAuthenticated, isAdmin, deleteComment);

export const adminRouter = router;
