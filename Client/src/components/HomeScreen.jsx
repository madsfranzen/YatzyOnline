import { Container, Box, Typography } from '@mui/material';
import LobbyList from './LobbyList'; // Assuming LobbyList is imported

export default function LobbyPage() {
	return (
		<Container>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" m={2}>
				<Typography variant="h4" component="h1" gutterBottom>
					ALL LOBBIES
				</Typography>
				<LobbyList />
			</Box>
		</Container >
	);
}

