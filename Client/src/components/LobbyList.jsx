import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import JoinButton from '../components/JoinButton.jsx'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export default function LobbyList() {
	const lobbiesDummy = [
		{ _id: 1, name: "Lobby 1", players: 1, maxPlayers: 5 },
		{ _id: 2, name: "Lobby 2", players: 2, maxPlayers: 10 },
		{ _id: 3, name: "Lobby 3", players: 5, maxPlayers: 5 },
		{ _id: 4, name: "Lobby 4", players: 3, maxPlayers: 5 },
	];

	const [lobbies, setLobbies] = useState(lobbiesDummy);

	useEffect(() => {
		const fetchLobbies = async () => {
			try {
				const response = await fetch(BACKEND_URL + '/lobbies', {
					headers: { 'Content-Type': 'application/json' },
					credentials: "include", // Include credentials (cookies/session data)
				});
				const data = await response.json();
				if (Array.isArray(data.lobbies)) {
					setLobbies(data.lobbies);
				} else {
					console.error("Unexpected data format:", data);
				}
			} catch (error) {
				console.error("Failed to fetch lobbies", error);
			}
		};

		fetchLobbies();
	}, []);

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			height: '100vh',
			margin: 'auto',
		}}>
			<div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="lobby table">
						<TableHead>
							<TableRow>
								<TableCell>Lobby Name</TableCell>
								<TableCell align="right">Players</TableCell>
								<TableCell align="right"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lobbies.map((lobby) => (
								<TableRow
									key={lobby._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{lobby.name}
									</TableCell>
									<TableCell align="right">{lobby.players}/{lobby.maxPlayers}</TableCell>
									<TableCell align="right">
										<JoinButton />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

