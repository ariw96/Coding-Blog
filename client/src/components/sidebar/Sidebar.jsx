import "./sidebar.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
function Sidebar() {
	const { user, dispatch } = useContext(Context);
	const [cat, setCat] = useState([]);
	const PF = "images/";
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get("/category");

			setCat(result.data);
		};
		fetchData();
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebar">ABOUT ME</span>
				{!user ? (
					<img
						src="https://upload.wikimedia.org/wikipedia/he/a/a9/MarioNSMBUDeluxe.png"
						alt=""
					/>
				) : (
					<>
						<NavLink to="/settings">
							<img className="sidebarImg" src={PF + user.profilePic} alt="" />
						</NavLink>
					</>
				)}
				<p></p>
			</div>
			<div className="sidebarItem">
				{/* <span className="sidebarTitle">CATEGORIES</span> */}
				<ul className="sidebarList">
					{cat.map((cat) => (
						<li key={cat._id}>
							<NavLink className="link" to={`/?cat=${cat.name}`}>
								{cat.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
