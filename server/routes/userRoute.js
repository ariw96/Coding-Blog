import express from "express";
import {
	updateUser,
	deleteUser,
	getUser,
	getUsers,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/verify.js";
const router = express.Router();
//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", getUsers);

export default router;
