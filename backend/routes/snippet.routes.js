import express from "express";
import { getSnippetByFrameworkAndCategory, getSnippetDetail } from "../controllers/snippet.controller.js";

const router = express.Router();


router.get("/:frameworkSlug/:categorySlug/snippets", getSnippetByFrameworkAndCategory);
router.get("/:frameworkSlug/:categorySlug/:integrationSlug", getSnippetDetail);

export default router;
