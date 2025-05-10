import express from "express";
import { signin, signup, } from "../controllers/auth.controller.js";
import tryCatch from "../middlewares/tryCatch.js";
const router = express.Router();
router.post("/signup", tryCatch(signup));
router.post("/signin", tryCatch(signin));
export default router;
