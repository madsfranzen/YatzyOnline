import Player from "../models/player.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const player = await Player.findOne({ username });

    const isPasswordValid = bcrypt.compareSync(password, player.password);


    if (!player || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: player._id, username: player.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login succesful" });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
