import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import {  getTopUsers, getUserStats } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();
router.get("/getUserStats", authenticate, tryCatch(getUserStats));
router.get("/getTopUsers",tryCatch(getTopUsers));

export default router;