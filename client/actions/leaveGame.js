// leaveGame.js
"use client";

export async function leaveGame(lobbyID) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${BACKEND_URL}/lobbies/${lobbyID}`, {
    method: "DELETE",
    body: JSON.stringify({ lobbyId: lobbyID }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Error leaving lobby");
    return { error: true };
  }

  return { success: true };
}

