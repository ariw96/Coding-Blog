import User from "../models/User.js";
import { createError } from "../utils/error.js";
//put user
export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(201);
		res.send(updatedUser);
		console.log("User updated");
	} catch (err) {
		next(err);
	}
};
//delete user
export const deleteUser = async (req, res, next) => {
	try {
		await user.findByIdAndDelete(req.params.id);
		res.status(201);
		res.send("Deleted user");
	} catch (err) {
		next(err);
	}
};
//get
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(201);
		res.send(user);
	} catch (err) {
		next(err);
	}
};
//get all
export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(201);
		res.send(users);
	} catch (err) {
		next(err);
	}
};
