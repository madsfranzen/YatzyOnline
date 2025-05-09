export async function createGame(req, res) {
  try {
    const { lobbyId } = req.body;

    const lobby = await Lobby.findById(lobbyId).populate("players");

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found." });
    }

    const playersWithScoreboards = lobby.players.map((p) => ({
      player: p._id,
      scoreboard: {},
    }));

    const newGame = new Game({
      lobby: lobby._id,
      players: playersWithScoreboards,
      throwCount: 0,
    });

    await newGame.save();

    return res
      .status(201)
      .json({ message: "Game created successfully.", game: newGame });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
