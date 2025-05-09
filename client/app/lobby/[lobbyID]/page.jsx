// app/lobby/[lobbyID]/page.jsx
import LobbyClient from './LobbyClient';

export default async function Page({ params }) {
  const { lobbyID } = await params;
  return <LobbyClient lobbyID={lobbyID} />;
}

