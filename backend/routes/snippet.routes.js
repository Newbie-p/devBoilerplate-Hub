import express from "express";
import { getSnippetByFrameworkAndCategory, getSnippetDetail, createSnippet, deleteSnippet, getSnippetById, updateSnippet } from "../controllers/snippet.controller.js";
import { verifyJWT, checkRole} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", verifyJWT, checkRole("admin"), createSnippet);

router.get("/id/:id", getSnippetById);

router.get("/:frameworkSlug/:categorySlug/snippets", getSnippetByFrameworkAndCategory);
router.get("/:frameworkSlug/:categorySlug/:integrationSlug", getSnippetDetail);

router.put("/:id", verifyJWT, checkRole("admin"), updateSnippet)
router.delete("/:id", verifyJWT, checkRole("admin"), deleteSnippet);
export default router;
