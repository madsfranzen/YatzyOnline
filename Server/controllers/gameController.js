import Lobby from "../models/lobby.js";
import Game from "../models/game.js";

export async function createGame(req, res) {
  try {
    const { lobbyId } = req.body;

    // Populate the players' usernames explicitly
    const lobby = await Lobby.findById(lobbyId)
      .populate({
        path: "players",
        select: "username",  // Ensures that username is populated
        model: "Player",     // Ensures correct model is populated
      });

    console.log("Populated lobby:", lobby); // Log the populated lobby

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    // Map players with their scoreboards and usernames
    const playersWithScoreboards = lobby.players.map((p) => ({
      player: p._id,
      username: p.username,  // Should now have username populated
      scoreboard: {},
    }));

    // Create a new game with players' usernames
    const newGame = new Game({
      lobby: lobby._id,
      players: playersWithScoreboards,
      throwCount: 0,
    });

    await newGame.save();

    return res.status(201).json({ message: "Game created successfully.", game: newGame });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

