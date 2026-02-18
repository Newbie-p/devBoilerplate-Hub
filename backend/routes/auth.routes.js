import express, { Router } from "express";
import { registerUser, loginUser, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);

export default router;