import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
		},
		desc: {
			type: String,
		},
		img: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
