// app/lobby/[lobbyID]/page.jsx
import LobbyClient from './LobbyClient';

export default async function Page({ params }) {
  const { lobbyID } = await params; // or just use params.lobbyID directly
  return <LobbyClient lobbyID={lobbyID} />;
}

