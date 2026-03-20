import express from "express";
import { getAllFrameworks, createFramework } from "../controllers/framework.controller.js";
import { verifyJWT, checkRole } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", getAllFrameworks);
router.post("/", verifyJWT, checkRole("admin"), createFramework);

export default router;