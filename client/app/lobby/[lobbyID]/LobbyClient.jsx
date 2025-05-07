// app/lobby/[lobbyID]/LobbyClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LobbyClient({ lobbyID }) {
	const router = useRouter();
	const [username, setUsername] = useState(null);
	const [lobbyData, setLobbyData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch user info
	useEffect(() => {
		fetch(`${BACKEND_URL}/auth/me`, {
			credentials: 'include',
		})
			.then(async (res) => {
				if (res.status === 401) {
					router.push('/');
					return null;
				}
				return res.ok ? res.json() : null;
			})
			.then((data) => setUsername(data?.username ?? null))
			.catch(() => setUsername(null));
	}, [router]);

	// Fetch lobby data
	useEffect(() => {
		fetch(`${BACKEND_URL}/lobbies/${lobbyID}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => {
				if (!res.ok) throw new Error('Lobby not found');
				return res.json();
			})
			.then((data) => {
				setLobbyData(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				router.push('/404');
			});
	}, [lobbyID, router]);

	if (loading || !lobbyData) {
		return <div className="p-4 text-gray-500">Loading lobby...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar username={username} />
			<div className="p-4">
				<h1 className="text-2xl font-bold">Lobby: {lobbyData.lobbyName}</h1>
				<p>Lobby ID: {lobbyID}</p>
				{/* Add additional lobby/game content here */}
			</div>
		</div>
	);
}
