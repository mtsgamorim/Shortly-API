import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", validateSignUp, createUser);
router.post("/signin", validateSignIn, loginUser);

export default router;
