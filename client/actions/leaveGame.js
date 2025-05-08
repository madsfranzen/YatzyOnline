"use client";

import { redirect } from "next/navigation";

export async function leaveGame(lobbyID) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(BACKEND_URL + "/lobbies/" + lobbyID, {
      method: "DELETE",
      body: JSON.stringify({ lobbyId: lobbyID }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      return { error: "Error leaving lobby." };
    }
    redirect("/");
}
