import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import { addError, getAllErrors } from "../controllers/errorReport.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
const router = express.Router();
router.post("/add", authenticate, tryCatch(addError));
router.get("/get/all", tryCatch(getAllErrors));

export default router;
