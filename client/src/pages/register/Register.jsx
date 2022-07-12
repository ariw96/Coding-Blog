import "./register.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post("/auth/register", {
				username,
				email,
				password,
			});
			result.data && window.location.replace("/login");
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};

	return (
		<div className="register">
			<form className="registerForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					className="registerInput"
					type="text"
					placeholder="Enter your username..."
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>Email</label>
				<input
					className="registerInput"
					type="text"
					placeholder="Enter your email..."
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input
					className="registerInput"
					type="password"
					placeholder="Enter your password..."
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="registerButton" type="submit">
					Register
				</button>
			</form>
			{err && <span className="registerError">Username already exists</span>}
			<NavLink to="/login" className="link">
				<button className="registerLoginButton">Login</button>
			</NavLink>
		</div>
	);
}
