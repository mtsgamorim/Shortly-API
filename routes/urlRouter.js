import { Router } from "express";
import { createShortUrl, getUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateParam, validateUrl } from "../middlewares/urlMiddleware.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrl, createShortUrl);
router.get("/urls/:id", validateParam, getUrl);

export default router;
