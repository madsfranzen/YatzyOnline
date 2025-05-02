import Player from "../models/player.js";

export async function createPlayer(req, res) {
  try {
    const { username, password } = req.body;

    const player = new Player({
      username,
      password,
    });

    await player.save();

    res.status(201).json(player);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: error });
  }
}

export async function validatePlayer(req, res) {
  try {
    const {username, password} = req.body;

    const player = await Player.findOne({username});

    if (!player) {
      return res.status(404).json({error: "Player not found"})
    }

    const isPasswordValid = bcrypt.compareSync(password, player.password);

    if (!isPasswordValid) {
      return res.status(401).json({error: "Invalid credentials"})
    }
    res.status(200).json({message: "Login Successful", player});
  } catch (error) {
    console.error("Error validating player: ", error);
    res.status(500).json({message: error.message})
  }
  
}

export async function getPlayer(req, res) {
  try {
    const { id } = req.id;

    const player = await Player.findById(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(404).json(player);
  } catch (error) {
    console.error("Error retrieving player: ", error);
    res.status(500).json({ message: error });
  }
}

export async function getPlayers(req, res) {
  try {
    const players = await Player.find();

    if (players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }

    res.status(200).json(players);
  } catch (error) {
    console.error("Error retrieving players: ", error);
    res.status(500).json({ message: error });
  }
}
