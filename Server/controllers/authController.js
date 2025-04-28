import Player from "../models/player.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const player = await Player.findOne({ username });

    if (!player || player.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.session.userId = player.id;

    return res.status(200).json(player);
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    // Respond with a JSON indicating success
    res.json({ message: "Successfully logged out" });
  });
}
