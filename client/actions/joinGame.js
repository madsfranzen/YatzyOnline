"use client";

import { redirect } from "next/navigation";

export async function joinGame(lobby) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (lobby.playerMax === lobby.playerCount) {
    // not allowed to join full lobby

    // TODO: Unless user is already in lobby? This is a big part of error handling.

    redirect("/");
  } else {
    const res = await fetch(BACKEND_URL + "/lobbies/" + lobby._id, {
      method: "POST",
      body: JSON.stringify({ lobbyId: lobby._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      return { error: "Error joining lobby." };
    }
    redirect("/lobby/" + lobby._id);
  }
}
