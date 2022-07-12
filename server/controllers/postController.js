import Post from "../models/Post.js";

import { createError } from "../utils/error.js";
//post post
export const createPost = async (req, res, next) => {
	try {
		const newPost = await Post.create(req.body);
		const savedPost = await newPost.save();
		res.status(201);
		res.send(savedPost);
	} catch (err) {
		next(err);
	}
};
//delete user
export const deletePost = async (req, res, next) => {
	// const post = await Post.findById(req.params.id);
	try {
		await Post.findByIdAndDelete(req.params.id);
		res.status(201);
		res.send("Deleted Post");
	} catch (err) {
		next(
			createError(
				403,

				"You are not authorized to update this post"
			)
		);
	}
};
//get
export const getPost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(201);
		res.send(post);
	} catch (err) {
		next(err);
	}
};
//get all
export const getPosts = async (req, res, next) => {
	const username = req.query.user;
	const catName = req.query.cat;
	try {
		let posts;
		if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			});
		} else {
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		next(err);
	}
};
//update
export const updatePost = async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (post.username === req.body.username) {
		try {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(201);
			res.send(updatedPost);
		} catch (err) {
			next(err);
		}
	} else {
		next(createError(403, "You are not authorized to update this post"));
	}
};
