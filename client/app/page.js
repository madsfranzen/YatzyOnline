"use client";
import Navbar from "@/components/ui/Navbar";
import LobbyList from "@/components/ui/LobbyList";
import { useState, useEffect } from "react";

export default function Home() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch(BACKEND_URL + "/auth/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        } else if (res.status === 401) {
          // Not logged in
          setUsername(null);
        } else {
          // Other errors
          console.error("Unexpected error:", res.status);
          setUsername(null);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setUsername(null);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={username} />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <LobbyList username={username} />
      </div>
    </div>
  );
}
