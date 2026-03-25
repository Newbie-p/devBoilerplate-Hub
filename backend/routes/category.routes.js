import express from "express";
import { getCategoriesByFramework, createCategory, getCategoriesByFrameworkId } from "../controllers/category.controller.js";
import { verifyJWT, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/categories/by-framework", getCategoriesByFrameworkId);
router.get("/:frameworkSlug/categories", getCategoriesByFramework);
router.post("/categories", verifyJWT, checkRole("admin"),createCategory)

export default router;