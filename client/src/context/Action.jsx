export const LoginStart = (userCredentials) => ({
	type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
	type: "LOGIN_SUCCESS",
	payload: user,
});
export const LoginFail = (error) => ({
	type: "LOGIN_FAIL",
});
export const LoginOut = () => ({
	type: "LOGOUT",
});
export const updateStart = (userCredentials) => ({
	type: "UPDATE_START",
});

export const updateSuccess = (user) => ({
	type: "UPDATE_SUCCESS",
	payload: user,
});
export const updateFail = (error) => ({
	type: "UPDATE_FAIL",
});
