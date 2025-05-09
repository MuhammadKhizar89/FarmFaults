import express from "express";
import { deleteUser, getUser, logout, signin, signup, updateAvatar, verify, } from "../controllers/auth.controller.js";
import tryCatch from "../middlewares/tryCatch.js";
import { authenticate } from "../middlewares/authenticate.js";
const router = express.Router();
router.post("/signup", tryCatch(signup));
router.post("/signin", tryCatch(signin));
router.get("/verify", authenticate, tryCatch(verify));
router.delete("/logout", tryCatch(logout));
router.post("/update/avatar", authenticate, tryCatch(updateAvatar));
router.delete("/delete/user", authenticate, tryCatch(deleteUser));
router.get("/get/user", authenticate, tryCatch(getUser));

export default router;
