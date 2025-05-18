// middleware/optionalAuthenticateToken.js
import jwt from "jsonwebtoken";

export async function optionalAuthenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next(); // No token — just proceed without user
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Valid token — attach user
  } catch (error) {
    // Invalid token — ignore and continue
  }

  next(); // Always continue
}

