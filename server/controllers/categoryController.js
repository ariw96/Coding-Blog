import Category from "../models/Category.js";

import { createError } from "../utils/error.js";
//post post
export const createCategory = async (req, res, next) => {
	const newCategory = await Category.create(req.body);
	try {
		const savedCategory = await newCategory.save();
		res.status(201);
		res.send(savedCategory);
	} catch (err) {
		next(err);
	}
};
export const getCategory = async (req, res, next) => {
	try {
		const category = await Category.find();
		res.status(201);
		res.send(category);
	} catch (err) {
		next(err);
	}
};
