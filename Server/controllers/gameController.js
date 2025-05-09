import Lobby from "../models/lobby.js";
import Game from "../models/game.js";

export async function createGame(req, res) {
  console.log("CREATE GAME CALLED");

  try {
    const { lobbyId } = req.body;

    const lobby = await Lobby.findById(lobbyId).populate({
      path: "players",
      select: "username",
      model: "Player",
    });

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    // Prepare players for the game
    const playersWithScoreboards = lobby.players.map((p) => ({
      player: p._id,
      scoreboard: {}, // or your detailed scoreboard structure
    }));

    // Create game
    const newGame = new Game({
      lobby: lobby._id,
      players: playersWithScoreboards,
      throwCount: 0,
    });

    await newGame.save();

    // Set game reference in the lobby
    lobby.game = newGame._id;
    await lobby.save();

    return res.status(201).json({ message: "Game created successfully.", game: newGame });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

