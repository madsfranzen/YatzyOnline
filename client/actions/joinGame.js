'use client'

import { redirect } from "next/navigation"

export async function joinGame(lobbyId) {

	console.log("JOIN LOBBY WITH ID: " + lobbyId)

	redirect('/lobby/' + lobbyId)

}
