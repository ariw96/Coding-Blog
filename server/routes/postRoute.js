import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	updatePost,
} from "../controllers/postController.js";
import { verifyUser } from "../utils/verify.js";
const router = express.Router();
//UPDATE
router.put("/:id", updatePost);
//set
router.post("/", createPost);

//DELETE
router.delete("/:id", deletePost);

//GET
router.get("/:id", getPost);

//GET ALL
router.get("/", getPosts);

export default router;
