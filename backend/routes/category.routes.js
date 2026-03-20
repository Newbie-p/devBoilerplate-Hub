import express from "express";
import { getCategoriesByFramework, createCategory } from "../controllers/category.controller.js";
import { verifyJWT, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:frameworkSlug/categories", getCategoriesByFramework);
router.post("/categories", verifyJWT, checkRole("admin"),createCategory)

export default router;