import { NavLink } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
	const port = process.env.PORT || "http://localhost:5000";
	const PF = `images/${post.img}`;
	return (
		<div className="post">
			{post.img && <img className="postImg" src={PF} alt="" />}

			<div className="postInfo">
				<div className="postCats">
					{post.categories.map((cat) => {
						<span className="postCat">category:{cat.name}</span>;
					})}
				</div>
				<span className="postTitle">
					<NavLink to={`/post/${post._id}`} className="link">
						{post.title}
					</NavLink>
				</span>
				<hr />
				<span className="postDate">
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className="postDesc">{post.desc && post.desc.substring(0, 100)}</p>
		</div>
	);
}
