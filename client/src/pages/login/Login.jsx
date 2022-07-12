import "./login.css";
import { NavLink } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		const user = userRef.current.value;
		const password = passwordRef.current.value;
		try {
			const result = await axios.post("/auth/login", {
				username: user,
				password: password,
			});

			dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
			window.location.replace("/");
		} catch (e) {
			dispatch({ type: "LOGIN_FAIL" });
		}
	};
	return (
		<div className="login">
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					className="loginInput"
					type="text"
					placeholder="Enter your email..."
					ref={userRef}
				/>
				<label>Password</label>
				<input
					className="loginInput"
					type="password"
					placeholder="Enter your password..."
					ref={passwordRef}
				/>
				<button className="loginButton" type="submit" disabled={isFetching}>
					Login
				</button>
			</form>
			<NavLink to="/register" className="link">
				<button className="loginRegisterButton">Register</button>
			</NavLink>
		</div>
	);
}
