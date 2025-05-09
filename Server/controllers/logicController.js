import Game from "../models/game.js";
import Lobby from "../models/lobby.js";

export async function getGameState(req, res) {
  try {
    const lobbyId = req.params.lobbyId;
    const game = Game.find({ lobbyId });

    res.status(200).json({game, message: "GameState retrieved successfully" });
  } catch (error) {}
}

export async function getValues(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "Values retrieved successfully" });
  } catch (error) {}
}

export async function holdDice(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

export async function getResults(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

export async function holdResult(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

export async function throwDice(req, res) {
  try {
    const player = req.user;

    const lobbyId = req.body;

    const players = await Lobby.findById(lobbyId)
      .populate("game")
      .populate("players");

    console.log(players);

    res.status(200).json({ players });

    throwDice = () => {
      this.throwCount++;
      for (let i = 0; i < this.values.length; i++) {
        if (!this.holdStatus[i]) {
          this.values[i] = Math.floor(Math.random() * 6) + 1;
        }
      }
    };
  } catch (error) {}
}
