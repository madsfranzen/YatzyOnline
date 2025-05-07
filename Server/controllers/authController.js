import Player from "../models/player.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const player = await Player.findOne({ username });

    const isPasswordValid = bcrypt.compareSync(password, player.password);

    if (!player) {
      return res.status(401).json({ message: "Invalid username" });
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: player._id, username: player.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // "lax" is fine for dev across localhost ports
      secure: process.env.NODE_ENV === "production", // Make sure it's secure in production
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login succesful" });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logOut(_req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // Make sure it's secure in production
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export function getMe(req, res) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ username: decoded.username });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
