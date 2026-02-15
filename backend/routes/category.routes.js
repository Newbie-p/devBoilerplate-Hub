import express from "express";
import { getCategoriesByFramework } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/:frameworkSlug/categories", getCategoriesByFramework);

export default router;