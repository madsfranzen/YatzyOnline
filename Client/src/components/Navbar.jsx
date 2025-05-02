import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Navbar({ onLogout }) {
	return (
		<nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
			<Container>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					{/* Yatzy Online on the left */}
					<Link
						to="/"
						style={{ textDecoration: 'none', color: 'black' }}
					>
						<Typography
							variant="h5"
							component="h2"
							sx={{
								fontFamily: 'Ranchers, sans-serif',
								fontWeight: 'bold',
								textDecoration: 'none',
								color: 'royalblue',
							}}
						>
							Yatzy Online
						</Typography>
					</Link>

					{/* Login or user greeting on the right */}
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<Button variant="contained">Login</Button>
					</Link>
				</Box>
			</Container>
		</nav>
	);
}

