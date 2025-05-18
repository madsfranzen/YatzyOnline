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
  threeOfAKind: { value: 0, status: false },
  fourOfAKind: { value: 0, status: false },
  twoXThreeOfAKind: { value: 0, status: false },
  fullHouse: { value: 0, status: false },
  smallStraight: { value: 0, status: false },
  largeStraight: { value: 0, status: false },
  royalStraight: { value: 0, status: false },
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

export async function holdResult(req, res) {
  try {
    const { lobbyId, username, category } = req.body;

    if (!lobbyId || !username || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lobby = await Lobby.findById(lobbyId);
    if (!lobby) return res.status(404).json({ error: "Lobby not found" });

    const game = await Game.findOne({ lobby: lobby._id }).populate(
      "players.player",
    );
    if (!game) return res.status(404).json({ error: "Game not found" });

    const playerIndex = game.players.findIndex(
      (p) => p.player.username === username,
    );
    if (playerIndex === -1)
      return res.status(404).json({ error: "Player not found in game" });

    const player = game.players[playerIndex];

    if (!player.scoreboard[category])
      return res.status(400).json({ error: "Invalid category" });

    const scoreField = player.scoreboard[category];

    if (scoreField.status) {
      return res.status(400).json({ error: "Category already used" });
    }

    // Lock the category
    scoreField.status = true;

    // --- Recalculate bonus and totals ---
    const scoreCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    const upperTotal = scoreCategories.reduce((sum, cat) => {
      return sum + (player.scoreboard[cat]?.value || 0);
    }, 0);

    player.scoreboard["bonus"].value = upperTotal >= 63 ? 50 : 0;

    let total = 0;
    for (const [key, data] of Object.entries(player.scoreboard)) {
      if (!["bonus", "total", "totalScore"].includes(key) && data.status) {
        total += data.value || 0;
      }
    }

    total += player.scoreboard["bonus"].value || 0;
    player.scoreboard["total"].value = total;
    player.scoreboard["totalScore"].value = total;

    // --- Rotate turn ---
    const currentPlayerCount = game.players.length;
    game.players[playerIndex].isTurn = false;
    const nextIndex = (playerIndex + 1) % currentPlayerCount;
    game.players[nextIndex].isTurn = true;

    // --- Reset throwCount ---
    game.throwCount = 0;

    // --- Clear diceHolds ---
    game.diceHolds = [false, false, false, false, false];

    game.markModified("players");
    game.markModified("diceHolds");

    await game.save();

    return res.status(200).json({
      message: "Category held successfully",
      scoreboard: player.scoreboard,
    });
  } catch (err) {
    console.error("Error in holdResult:", err);
    return res.status(500).json({ error: "Internal server error" });
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
  const updatedScore = JSON.parse(JSON.stringify(existingScoreboard));

  const counts = {};
  for (const val of diceValues) {
    counts[val] = (counts[val] || 0) + 1;
  }

  const values = Object.values(counts);
  const unique = Object.keys(counts).map(Number);

  const scoreCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];
  for (let i = 0; i < scoreCategories.length; i++) {
    const category = scoreCategories[i];
    const faceValue = i + 1;
    if (updatedScore[category].status === false) {
      updatedScore[category].value = (counts[faceValue] || 0) * faceValue;
    }
  }

  // One Pair
  if (updatedScore["onePairs"].status === false) {
    const pairs = Object.entries(counts)
      .filter(([_, count]) => count >= 2)
      .map(([val]) => Number(val))
      .sort((a, b) => b - a);
    updatedScore["onePairs"].value = pairs.length > 0 ? pairs[0] * 2 : 0;
  }

  // Two Pairs
  if (updatedScore["twoPairs"].status === false) {
    const pairs = Object.entries(counts)
      .filter(([_, count]) => count >= 2)
      .map(([val]) => Number(val))
      .sort((a, b) => b - a);
    updatedScore["twoPairs"].value =
      pairs.length >= 2 ? pairs[0] * 2 + pairs[1] * 2 : 0;
  }

  // Three of a kind
  if (updatedScore["threeOfAKind"].status === false) {
    const threes = Object.entries(counts).find(([_, c]) => c >= 3);
    updatedScore["threeOfAKind"].value = threes ? Number(threes[0]) * 3 : 0;
  }

  // Four of a kind
  if (updatedScore["fourOfAKind"].status === false) {
    const fours = Object.entries(counts).find(([_, c]) => c >= 4);
    updatedScore["fourOfAKind"].value = fours ? Number(fours[0]) * 4 : 0;
  }

  // Full House
  if (updatedScore["fullHouse"].status === false) {
    const triplet = Object.entries(counts).find(([_, c]) => c === 3);
    const pairForFullHouse = Object.entries(counts).find(
      ([val, c]) => c === 2 && (!triplet || val !== triplet[0]),
    );
    if (triplet && pairForFullHouse) {
      updatedScore["fullHouse"].value =
        Number(triplet[0]) * 3 + Number(pairForFullHouse[0]) * 2;
    } else {
      updatedScore["fullHouse"].value = 0;
    }
  }

  // Small Straight
  if (updatedScore["smallStraight"].status === false) {
    const smallStraightSet = new Set([1, 2, 3, 4, 5]);
    const rolled = new Set(diceValues);
    const isSmall = [...smallStraightSet].every((v) => rolled.has(v));
    updatedScore["smallStraight"].value = isSmall ? 15 : 0;
  }

  // Large Straight
  if (updatedScore["largeStraight"].status === false) {
    const largeStraightSet = new Set([2, 3, 4, 5, 6]);
    const rolled = new Set(diceValues);
    const isLarge = [...largeStraightSet].every((v) => rolled.has(v));
    updatedScore["largeStraight"].value = isLarge ? 20 : 0;
  }

  // Royal Straight (1–6)
  if (updatedScore["royalStraight"]?.status === false) {
    const rolled = new Set(diceValues);
    const isRoyal = [1, 2, 3, 4, 5, 6].every((v) => rolled.has(v));
    updatedScore["royalStraight"].value = isRoyal ? 30 : 0;
  }

  // Two x Three of a Kind (e.g., [3,3,3,5,5,5])
  if (updatedScore["twoXThreeOfAKind"]?.status === false) {
    const tripleValues = Object.entries(counts)
      .filter(([_, count]) => count >= 3)
      .map(([val]) => Number(val))
      .sort((a, b) => b - a);
    if (tripleValues.length >= 2) {
      updatedScore["twoXThreeOfAKind"].value =
        tripleValues[0] * 3 + tripleValues[1] * 3;
    } else {
      updatedScore["twoXThreeOfAKind"].value = 0;
    }
  }

  // Chance
  if (updatedScore["chance"].status === false) {
    updatedScore["chance"].value = diceValues.reduce((a, b) => a + b, 0);
  }

  // Yatzy
  if (updatedScore["yatzy"].status === false) {
    updatedScore["yatzy"].value = values.includes(5) ? 50 : 0;
  }

  return updatedScore;
}
