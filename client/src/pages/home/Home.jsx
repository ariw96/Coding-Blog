import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get("/post" + search);
			setPosts(result.data);
		};
		fetchData();
	}, [search]);
	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</>
	);
}

export default Home;
