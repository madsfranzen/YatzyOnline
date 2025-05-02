import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"

const JoinButton = ({ }) => {
	const navigate = useNavigate();

	const handleJoin = async () => {
		// TODO: Implement logic for joining games
		navigate("/play");
	}

	return (
		<Button variant="contained" onClick={handleJoin}>
			Join
		</Button>
	)
}

export default JoinButton;
