import { Router } from "express";
import { receiveStats } from "../controllers/userController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.get("/users/me", validateToken, receiveStats);

export default router;
