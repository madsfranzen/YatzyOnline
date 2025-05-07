import Lobby from "../models/lobby.js";

export async function getLobbyByID(req, res) {
  try {
    const { lobbyID } = req.params;

    const lobby = await Lobby.findById(lobbyID);

    if (!lobby) {
      return res.status(404).json({ message: "No lobby found" });
    }

    res.status(200).json(lobby);
  } catch (error) {
    console.error("Error retrieving lobby: ", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getLobbies(_req, res) {
  try {
    const lobbies = await Lobby.find();

    if (lobbies.length === 0) {
      return res.status(404).json({ message: "No lobbies found" });
    }

    res.status(200).json(lobbies);
  } catch (error) {
    console.error("Error retrieving lobbies: ", error);
    res.status(500).json({ message: error });
  }
}

export async function createLobby(req, res) {
  try {
    const { lobbyName, playerMax } = req.body;

    const lobby = new Lobby({
      lobbyName,
      playerMax,
    });

    await lobby.save();

    res.status(201).json(lobby);
  } catch (error) {
    console.error("Error creating lobby: ", error);
    res.status(500).json({ message: error });
  }
}
