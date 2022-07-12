import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});
		await newUser.save();
		res.status(201).json({
			message: "User created successfully",
			token: generateToken(newUser._id),
			data: newUser,
		});
	} catch (err) {
		res.send("User created successfully");
		next(err);
	}
};
export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		const isPasswordValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		const { password, ...otherDetail } = user._doc;
		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({
				message: "User logged in successfully",
				data: otherDetail,
				token: generateToken(user._id),
			});
	} catch (err) {
		next(err);
	}
};
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
