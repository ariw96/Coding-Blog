import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();
const dirname = path.resolve();

app.use(cors());
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("server/images")));
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./server/images");
	},
	filename: (req, file, cb) => {
		console.log(req.body);
		cb(null, file.originalname);
	},
});
// app.use("/", res.send("Hello World"));
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
	res.send("Uploaded");
});
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/category", categoryRoute);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join("client/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve("../", "client", "build", "index.html"))
	);
}

app.listen(port, () => console.log(`Server started on port ${port}`));
