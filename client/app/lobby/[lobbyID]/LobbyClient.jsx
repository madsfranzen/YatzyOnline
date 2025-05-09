// app/lobby/[lobbyID]/LobbyClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { Button } from '@/components/ui/button';
import GameWindow from '@/components/ui/GameWindow';
import { leaveGame } from '@/actions/leaveGame';

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
		return (
			<div className="min-h-screen bg-gray-50">
				<Navbar username={username} />
				<div className="flex justify-center items-center h-60">
					<div className="animate-spin rounded-full h-15 w-15 border-t-4 border-b-4 border-black-800"></div>
				</div>
			</div>
		);
	}
	

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Navbar username={username} />

			<div className="flex-grow p-4">
				<Button>START GAME</Button>
				<GameWindow></GameWindow>
			</div>

			{/* This will be snapped to the bottom of the screen */}
			<div className="select-none p-4 flex justify-between items-center fixed bottom-0 w-full bg-none">
				<Button
					onClick={async () => {
						const confirmLeave = window.confirm("Are you sure you want to leave the game?");
						if (!confirmLeave) return;

						const result = await leaveGame(lobbyData._id);
						if (result?.success) {
							router.push('/');
						} else {
							console.error("Failed to leave game:", result?.error);
						}
					}}
				>
					Leave Game
				</Button>
				<div className="text-right">
					<h1 className="text-2xl font-bold">Lobby: {lobbyData.lobbyName}</h1>
					<p>Lobby ID: {lobbyID}</p>
				</div>
			</div>
		</div>
	);
}
