"use client";

import { leaveGame } from "@/actions/leaveGame";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function logout() {
  try {
    // Check if user is in a lobby
    const path = window.location.pathname;
    const isInLobby = path.startsWith("/lobby/");
    const lobbyID = isInLobby ? path.split("/")[2] : null;

    // Leave lobby first if applicable
    if (isInLobby && lobbyID) {
      await leaveGame(lobbyID);
    }

    // Proceed with logout
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      location.reload();
    } else {
      console.error("Logout failed:", response.statusText);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
}
