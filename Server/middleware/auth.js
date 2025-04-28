import Player from "../models/player.js";

export async function CheckSession(req, res, next) {
  if (req.originalUrl === "/auth/login" || req.originalUrl === "/auth/logout") {
    return next();
  }

  if (req.session && req.session.userId) {
    try {
      const player = await Player.findById(req.session.userId);

      if (!player) {
        return res.redirect("auth/login");
      }

      req.user = player;
      return next();

    } catch (error) {
      console.error("Error in sesison check middleware:", error);
      return res.redirect("/auth/login");
    }
  }

  return res.redirect('/auth/login')
}
