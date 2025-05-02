import Player from "../models/player.js";
import jwt from "jsonwebtoken";

export async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
