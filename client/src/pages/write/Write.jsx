import "./write.css";
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
function Write() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			title: title,
			desc: content,
			username: user.username,
		};
		if (file) {
			const formData = new FormData();
			const filename = file.name;
			formData.append("file", file);
			formData.append("name", filename);
			newPost.img = filename;
			try {
				const res = await axios.post("/upload", formData);
			} catch (e) {
				console.log(e);
			}
		}
		try {
			const res = axios.post("/post", newPost);
			window.location.replace("/");
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="write">
			{file && (
				<img className="writeImg" src={URL.createObjectURL(file)} alt="" />
			)}
			<form className="writeForm" onSubmit={handleSubmit}>
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="writeIcon fas fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="writeInput"
						autoFocus={true}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="tell your story..."
						type="text"
						className="writeInput writeText"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
				</div>
				<button className="writeSubmit" type="submit">
					Publish
				</button>
			</form>
		</div>
	);
}

export default Write;
