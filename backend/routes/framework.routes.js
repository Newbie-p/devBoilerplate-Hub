import express from "express";
import { getAllFrameworks } from "../controllers/framework.controller.js";

const router = express.Router();

router.get("/", getAllFrameworks);

export default router;