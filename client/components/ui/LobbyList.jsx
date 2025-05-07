'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { joinGame } from '@/actions/joinGame'
import JoinButton from './JoinButton'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function LobbyList({ username }) {
	const [lobbies, setLobbies] = useState([])

	useEffect(() => {
		const fetchLobbies = async () => {
			try {
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
			}
		}

		fetchLobbies()
	}, [])

	return (
		<div className="min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-10 text-center">Available Lobbies</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
				{lobbies.map((lobby) => (
					<Card key={lobby._id}>
						<CardContent className="w-50 flex flex-col gap-2 p-2">
							<div className='p-2'>
								<h2 className="text-lg font-semibold">{lobby.lobbyName}</h2>
								<p className="text-sm text-muted-foreground">
									{lobby.playerCount}/{lobby.playerMax} players
								</p>
							</div>
							<div className="flex justify-center mt-2">
								<JoinButton onClick={() => joinGame(lobby._id)} disabled={!username} />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

