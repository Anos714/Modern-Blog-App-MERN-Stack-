import { Router } from "express";
import {
  checkUserStatus,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/status", isAuthenticated, checkUserStatus);

export const authRouter = router;
