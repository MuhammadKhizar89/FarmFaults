import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import { addErrorEnum, getErrorEnum } from "../controllers/errorEnum.controller.js";
import {authenticate} from "../middlewares/authenticate.js";
const router = express.Router();
router.post("/add", authenticate, tryCatch(addErrorEnum));
router.get("/get", tryCatch(getErrorEnum));

export default router;
