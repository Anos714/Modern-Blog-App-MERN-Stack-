import { Router } from "express";
import {
  checkUserStatus,
  deleteUser,
  googleAuth,
  logout,
  signin,
  signup,
  updateUser,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/status", isAuthenticated, checkUserStatus);
router.post("/google", googleAuth);
router.post("/logout", isAuthenticated, logout);
router.delete("/delete/:id", isAuthenticated, deleteUser);
router.put("/update/:id", isAuthenticated, upload.single("avatar"), updateUser);

export const authRouter = router;
