import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./singlePost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [updateMode, setUpdateMode] = useState(false);
	const [post, setPost] = useState({});
	const PF = `http://localhost:5000/images/${post.img}`;
	const postId = window.location.pathname.split("/")[2];
	const { user } = useContext(Context);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`/post/${postId}`);

			setPost(result.data);
		};
		fetchData();
	}, [postId, updateMode]);
	const handleDelete = async () => {
		const result = await axios.delete(`/post/${post._id}`);
		window.location.replace("/");
	};
	const handleUpdate = async () => {
		try {
			await axios.put(`/post/${post._id}`, {
				username: user.username,
				title: title,
				desc: desc,
			});
			setUpdateMode(false);
		} catch (err) {
			setUpdateMode(false);
			console.log(err);
		}
	};
	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{post.img && <img className="singlePostImg" src={PF} alt="" />}
				{updateMode ? (
					<input
						type="text"
						value={title}
						placeholder="Update title..."
						onChange={(e) => setTitle(e.target.value)}
						className="singlePostTitleInput"
					/>
				) : (
					<h1 className="singlePostTitle">
						{post.title}
						{post.username === user?.username && (
							<div className="singlePostEdit ">
								<button className=" btn" onClick={() => setUpdateMode(true)}>
									Edit
								</button>
								<button className="red btn" onClick={handleDelete}>
									X
								</button>
							</div>
						)}
					</h1>
				)}
				<h2>
					Author:
					<b className="singlePostAuthor">
						<Link className="link" to={`/?user=${post.username}`}>
							{post.username}
						</Link>
					</b>
				</h2>
				<div className="singlePostInfo">
					<span>{new Date(post.createdAt).toDateString()}</span>
				</div>
				{updateMode ? (
					<textarea
						value={desc}
						className="singlePostDescInput"
						onChange={(e) => setDesc(e.target.value)}
					>
						{post.desc}
					</textarea>
				) : (
					<p className="singlePostDesc">{post.desc}</p>
				)}
				{updateMode && (
					<button className="singlePostButton" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
}
