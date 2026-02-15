import express from "express";
import { getSnippetByFrameworkAndCategory } from "../controllers/snippet.controller.js";

const router = express.Router();

router.get("/:frameworkSlug/:categorySlug/snippets", getSnippetByFrameworkAndCategory);

export default router;
