import express from "express";
import { getSnippetByFrameworkAndCategory, getSnippetDetail, createSnippet } from "../controllers/snippet.controller.js";
import { verifyJWT, checkRole} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", verifyJWT, checkRole("admin"), createSnippet);

router.get("/:frameworkSlug/:categorySlug/snippets", getSnippetByFrameworkAndCategory);
router.get("/:frameworkSlug/:categorySlug/:integrationSlug", getSnippetDetail);

export default router;
