import Lobby from "../models/lobby.js";
import Game from "../models/game.js";

const createEmptyScoreboard = () => ({
  ones: { value: 0, status: false },
  twos: { value: 0, status: false },
  threes: { value: 0, status: false },
  fours: { value: 0, status: false },
  fives: { value: 0, status: false },
  sixes: { value: 0, status: false },
  onePairs: { value: 0, status: false },
  twoPairs: { value: 0, status: false },
  threePairs: { value: 0, status: false },
  fourPairs: { value: 0, status: false },
  fullHouse: { value: 0, status: false },
  smallStraight: { value: 0, status: false },
  largeStraight: { value: 0, status: false },
  chance: { value: 0, status: false },
  yatzy: { value: 0, status: false },
  bonus: { value: 0, status: true },
  total: { value: 0, status: true },
  totalScore: { value: 0, status: true },
});

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
    const playersWithScoreboards = lobby.players.map((p, index) => ({
      player: p._id,
      scoreboard: createEmptyScoreboard(),
      isTurn: index === 0, // true for the first player, false for others
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

    return res
      .status(201)
      .json({ message: "Game created successfully.", game: newGame });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
export async function rollDice(req, res) {
  const { lobbyId } = req.body;

  const lobby = await Lobby.findById(lobbyId).populate("game");
  const game = lobby.game;

  // Roll the dice
  game.diceValues = randomDice();
  game.throwCount++;

  // Find the player in the game
  const player = game.players.find(
    (p) => p.player.toString() === req.user.id.toString(),
  );

  if (!player) {
    return res.status(400).json({ message: "Player not found in the game." });
  }

  // Ensure scoreboard is initialized
  if (!player.scoreboard) {
    player.scoreboard = createEmptyScoreboard();
  }

  player.scoreboard = calculateScore(game.diceValues, player.scoreboard);

  const playerIndex = game.players.findIndex(
    (p) => p.player.toString() === req.user.id.toString(),
  );

  if (playerIndex !== -1) {
    game.players[playerIndex].scoreboard = calculateScore(
      game.diceValues,
      game.players[playerIndex].scoreboard,
    );

    game.markModified("players");
  }

  // Save to DB
  try {
    await game.save();
    return res.status(200).json({ message: "Dice rolled successfully.", game });
  } catch (error) {
    console.error("Error saving the game:", error);
    return res
      .status(500)
      .json({ message: "Failed to update the game", error });
  }
}

function randomDice() {
  const dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return dice;
}

function calculateScore(diceValues, existingScoreboard) {
  // Deep copy to avoid mutating original object
  const updatedScore = JSON.parse(JSON.stringify(existingScoreboard));

  // Update score for 'ones' through 'sixes'
  const scoreCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];

  for (let i = 0; i < scoreCategories.length; i++) {
    const category = scoreCategories[i];
    const faceValue = i + 1;
    const count = diceValues.filter((val) => val === faceValue).length;

    updatedScore[category].value = count * faceValue;

    // used for holds (handleCellClick())
    // updatedScore[category].status = true;
  }

  // TODO: THIS IS WHERE WE IMPLEMENT ALL LOGIC

  return updatedScore;
}
