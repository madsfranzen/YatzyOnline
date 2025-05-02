import Lobby from "../models/lobby.js";

export async function getLobbies(req, res) {
  try {

    const lobbies = await Lobby.find();

    if (lobbies.length === 0) {
      return res.status(404).json({ message: "No lobbies found" });
    }

    res.status(200).json(lobbies);
  } catch (error) {
    console.error("Error retrieving lobbies: ", error);
    res.status(500).json({ message: error });
  }
}
