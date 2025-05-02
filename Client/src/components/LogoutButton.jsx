import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LogoutButton = ({ onLogout }) => {
	const navigate = useNavigate(); // Create a navigate function

	const handleLogout = async () => {
		try {
			const response = await fetch("https://yatzyonline.onrender.com/auth/logout", {
				method: "GET", // Assuming GET for logout, change if necessary
				credentials: "include", // Include credentials (cookies/session data)
			});

			if (!response.ok) {
				throw new Error(`Logout failed with status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data.message); // This should be "Successfully logged out"

			// Call onLogout to reset user state and refresh the navbar
			onLogout();

			// Redirect to the login page using React Router
			navigate("/login");

		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<Button variant="contained" onClick={handleLogout}>
			Log Out
		</Button>
	);
};

export default LogoutButton;

