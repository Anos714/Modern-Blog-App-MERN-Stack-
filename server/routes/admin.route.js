import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.moddleware.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { allComments, allUsers } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", isAuthenticated, isAdmin, allUsers);
router.get("/comments", isAuthenticated, isAdmin, allComments);

export const adminRouter = router;
