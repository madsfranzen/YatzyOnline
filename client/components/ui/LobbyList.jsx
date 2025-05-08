'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { joinGame } from '@/actions/joinGame'
import JoinButton from './JoinButton'
import { Button } from './button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function LobbyList({ username }) {
	const [lobbies, setLobbies] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchLobbies = async () => {
			try {
				setLoading(true)
				const response = await fetch(`${BACKEND_URL}/lobbies`, {
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
				})
				const data = await response.json()
				if (Array.isArray(data)) {
					setLobbies(data)
				} else {
					console.error('Unexpected data format:', data)
				}
			} catch (err) {
				console.error('Failed to fetch lobbies', err)
			} finally {
				setLoading(false)
			}
		}

		fetchLobbies()
	}, [])

	const colorTints = [
		'bg-indigo-50',
		'bg-teal-50',
		'bg-pink-50',
		'bg-yellow-50',
		'bg-blue-50',
		'bg-green-50',
		'bg-purple-50',
		'bg-red-50',
	];


	return (
		<div className="select-none min-h-screen p-4">
			<div className='flex justify-center items-center'>
			<Card className="p-4 w-fit mb-8">
				<h1 className="text-xl text-center">Available Lobbies</h1>
			</Card>
			</div>
			{loading ? (
				<div className="flex justify-center items-center h-60">
					<div className="animate-spin rounded-full h-15 w-15 border-t-4 border-b-4 border-black-800"></div>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
					{lobbies.map((lobby, index) => {
						const tint = colorTints[index % colorTints.length];
						return (
							<Card key={lobby._id} className={tint}>
								<CardContent className="w-75 flex flex-col gap-2 p-2">
									<div className='p-2'>
										<h2 className="text-lg font-semibold">{lobby.lobbyName}</h2>
										<p className="text-sm text-muted-foreground">
											{lobby.playerCount}/{lobby.playerMax} players
										</p>
									</div>
									<div className="flex justify-center mt-2">
										{lobby.playerCount === lobby.playerMax ? (
											<Button disabled>Lobby Full</Button>
										) : (
											<JoinButton onClick={() => joinGame(lobby)} disabled={!username} />
										)}
									</div>
								</CardContent>
							</Card>
						);
					})}

				</div>
			)}
		</div>
	)
}

