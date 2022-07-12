import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";

export default function Settings() {
	const port = process.env.PORT || "http://localhost:5000";
	const PF = `${port}/images/`;
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("password");
	const [success, setSuccess] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username: username,
			email: email,
			// password: password,
		};
		if (file) {
			const formData = new FormData();
			const filename = file.name;
			formData.append("file", file);
			formData.append("name", filename);
			updatedUser.profilePic = filename;
			try {
				await axios.post("/upload", formData);
			} catch (e) {
				console.log(e);
				dispatch({ type: "UPDATE_FAIL" });
			}
		}
		try {
			const res = await axios.put("/user/" + updatedUser.userId, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			window.location.replace("/");
		} catch (e) {
			console.log("error", e);
		}
	};
	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsTitleUpdate">Update Your Account</span>
					<span className="settingsTitleDelete">Delete Account</span>
				</div>
				<form className="settingsForm" onSubmit={handleSubmit}>
					<label>Profile Picture</label>
					<div className="settingsPP">
						<img
							src={file ? URL.createObjectURL(file) : PF + user.profilePic}
							alt=""
						/>
						<label htmlFor="fileInput">
							<i className="settingsPPIcon far fa-user-circle"></i>{" "}
						</label>
						<input
							id="fileInput"
							type="file"
							style={{ display: "none" }}
							className="settingsPPInput"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<label>Username</label>
					<input
						type="text"
						// placeholder={user.data.username}
						name="name"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email</label>
					<input
						type="email"
						placeholder={user.email}
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input type="password" placeholder="Password" name="password" />
					<button className="settingsSubmitButton" type="submit">
						Update
					</button>
				</form>
				{success && (
					<div className="settingsSuccess">Profile has been updated</div>
				)}
			</div>
			<Sidebar />
		</div>
	);
}
