import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function LobbyList() {
	// Dummy data for the lobbies
	const lobbies = [
		{ id: 1, name: "Lobby 1", players: 1, maxPlayers: 5 },
		{ id: 2, name: "Lobby 2", players: 2, maxPlayers: 10 },
		{ id: 3, name: "Lobby 3", players: 5, maxPlayers: 5 },
		{ id: 4, name: "Lobby 4", players: 3, maxPlayers: 5 },
	];

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
									key={lobby.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{lobby.name}
									</TableCell>
									<TableCell align="right">{lobby.players}/{lobby.maxPlayers}</TableCell>
									<TableCell align="right">
										<Button variant="contained" color="primary">Join</Button>
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

