import "./topbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Topbar() {
	const { user, dispatch } = useContext(Context);
	const PF = "http://localhost:5000/images/";
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace("/");
	};

	return (
		<div className="top">
			<div className="topCenter">
				<div className="topList">
					<NavLink to="/" className="link">
						<div className="topListItem">HOME</div>
					</NavLink>

					<NavLink to="/write" className="link">
						<div className="topListItem">WRITE</div>
					</NavLink>
					<div className="topListItem" onClick={handleLogout}>
						{user && "LOGOUT"}
					</div>
				</div>
			</div>
			<div className="topRight">
				{user ? (
					<>
						<NavLink to="/settings" className="link">
							<img className="topImg" src={PF + user.profilePic} alt="" />
						</NavLink>
					</>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<NavLink to="/login" className="link">
								Login
							</NavLink>
						</li>
						<li className="topListItem">
							<NavLink to="/register" className="link">
								Register
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
}

export default Topbar;
