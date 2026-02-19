import express, { Router } from "express";
import { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/google-login", googleLogin);

export default router;