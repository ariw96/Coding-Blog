import express from "express";

const router = express.Router();
import { register, login } from "../controllers/authController.js";

// @route   POST api/auth/register
// @desc    Register user
// @access  Private
router.post("/register", register);
// @route   POST api/auth/login
// @desc    Register user
// @access  Private

router.post("/login", login);
export default router;
