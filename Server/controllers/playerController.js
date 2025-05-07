import Player from "../models/player.js";
import bcrypt from "bcryptjs";

export async function createPlayer(req, res) {
  try {
    const { username, password } = req.body;

     const hashedPassword = bcrypt.hashSync(password, 10);

    const player = new Player({
      username,
      password: hashedPassword,
    });

    await player.save();

    res.status(201).json(player);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: error });
  }
}

export async function getPlayer(req, res) {
  try {
    const { id } = req.params

    console.log(id);

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
