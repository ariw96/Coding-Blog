import express from "express";
import {
	createCategory,
	getCategory,
} from "../controllers/categoryController.js";
import { verifyUser } from "../utils/verify.js";
const router = express.Router();

//set
router.post("/", createCategory);

//GET
router.get("/", getCategory);
export default router;
