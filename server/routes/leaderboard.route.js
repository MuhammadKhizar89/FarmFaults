import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import { getRankedUsers } from "../controllers/leaderboard.controller.js";
const router = express.Router();

router.post("/getleaderboardUsers", tryCatch(getRankedUsers));

export default router;
