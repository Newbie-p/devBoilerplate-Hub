import express from "express";
import { createSnippet, updateSnippet, deleteSnippet } from "../controllers/admin.controller.js";
import { verifyJWT, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);
router.use(checkRole("admin"));

router.post("/snippets", createSnippet);
router.put("/snippets/:id", updateSnippet);
router.delete("/snippets/:id", deleteSnippet);

export default router;