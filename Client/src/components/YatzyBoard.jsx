import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const players = ['Alice', 'Bob'];
const categories = [
	'Enere', 'Toere', 'Treere', 'Firere', 'Femere', 'Seksere',
	'Sum', 'Bonus',
	'1 par', '2 par', '3 ens', '4 ens',
	'Lille straight', 'Stor straight', 'Fuldt hus', 'Chance', 'Yatzy', 'Total'
];

export default function YatzyBoard() {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				padding: 4,
				fontFamily: 'sans-serif',
			}}
		>
			<Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
				Yatzy Scorecard
			</Typography>

			<TableContainer component={Paper} elevation={3}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><strong>Kategori</strong></TableCell>
							{players.map((player, index) => (
								<TableCell key={index} align="center"><strong>{player}</strong></TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{categories.map((category, rowIndex) => (
							<TableRow key={rowIndex}>
								<TableCell>{category}</TableCell>
								{players.map((_, colIndex) => (
									<TableCell key={colIndex} align="center" sx={{ minWidth: 60 }}>
										{/* Placeholder for score - empty for now */}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

