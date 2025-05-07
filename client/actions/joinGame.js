'use client'

import { redirect } from "next/navigation"

export async function joinGame(lobbyId) {

	
	redirect('/lobby/' + lobbyId)


}
