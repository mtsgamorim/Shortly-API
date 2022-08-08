import { Router } from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrl,
  redirectUrl,
} from "../controllers/urlController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import {
  validateParam,
  validateParamUrl,
  validateUrl,
  validateUser,
} from "../middlewares/urlMiddleware.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrl, createShortUrl);
router.get("/urls/:id", validateParam, getUrl);
router.get("/urls/open/:shortUrl", validateParamUrl, redirectUrl);
router.delete(
  "/urls/:id",
  validateToken,
  validateParam,
  validateUser,
  deleteUrl
);

export default router;
