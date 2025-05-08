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
    res.status(500).json({ message: error });
  }
}

export async function joinLobby(req, res) {
  try {
    const { lobbyId } = req.body;

    // Find the lobby first
    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    // Check if lobby is full
    if (lobby.playerCount < lobby.playerMax) {
      const updatedLobby = await Lobby.findByIdAndUpdate(
        lobbyId,
        { $inc: { playerCount: 1 } },
        { new: true },
      );

      return res
        .status(200)
        .json({ message: "Successfully joined lobby.", lobby: updatedLobby });
    } else {
      return res.status(400).json({ message: "Lobby is full." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function leaveLobby(req, res) {
  try {
    const { lobbyId } = req.body;

    // Find the lobby first
    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    // Check if lobby is empty
    if (lobby.playerCount != 0) {
      const updatedLobby = await Lobby.findByIdAndUpdate(
        lobbyId,
        { $inc: { playerCount: -1 } },
        { new: true },
      );

      return res
        .status(200)
        .json({ message: "Successfully left lobby.", lobby: updatedLobby });
    } else {
      return res.status(400).json({ message: "Lobby is empty." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
