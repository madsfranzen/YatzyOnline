import Player from "../models/player.js";

export async function createPlayer(req, res) {
  try {
    const { username, password } = req.body;

    const player = new Player({
      username,
      password,
    });

    await player.save();

    res.status(201).json({ message: "Player created successfully"});

  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: error});
  }
}
