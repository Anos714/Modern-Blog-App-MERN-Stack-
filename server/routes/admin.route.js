import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.moddleware.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { allUsers } from "../controllers/admin.controller.js";

const router = Router();

router.get("/all", isAuthenticated, isAdmin, allUsers);

export const adminRouter = router;
