import { Router } from "express";
import { receiveRanking } from "../controllers/rankingController.js";

const router = Router();

router.get("/ranking", receiveRanking);

export default router;
