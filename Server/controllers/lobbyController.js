import Game from "../models/game.js";
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
    const lobbyId = req.params.lobbyId;

    console.log(lobbyId);

    const user = req.user;

    console.log(user);

    // Find the lobby
    const lobby = await Lobby.findById(lobbyId);

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    if (lobby.players.some((p) => p._id.toString() === user.id.toString())) {
      return res.status(400).json({ message: "Player already in the lobby." });
    }

    // Check if lobby is full
    if (lobby.players.length < lobby.playerMax) {
      console.log("lobby is not full");

      console.log(user.id);

      const updatedLobby = await Lobby.findByIdAndUpdate(
        lobbyId,
        { $push: { players: user.id } },
        { new: true }
      );

      console.log(updatedLobby);

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

    const player = req.user;

    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    const isInLobby = lobby.players.some((p) => p === player._id);
    if (!isInLobby) {
      return res.status(400).json({ message: "Player not in this lobby." });
    }

    const updatedLobby = await Lobby.findByIdAndUpdate(
      lobbyId,
      { $pull: { players: player._id } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully left lobby.", lobby: updatedLobby });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
