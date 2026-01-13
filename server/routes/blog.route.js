import { Router } from "express";
import {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/Blog.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.moddleware.js";
import { upload } from "../config/multer.js";
const router = Router();

router.get("/all", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/add", upload.single("image"), isAuthenticated, isAdmin, addBlog);
router.patch(
  "/update/:id",
  upload.single("image"),
  isAuthenticated,
  isAdmin,
  updateBlog
);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteBlog);

export const blogRouter = router;
