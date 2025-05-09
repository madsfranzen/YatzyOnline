import Game from "../models/game.js";
import Lobby from "../models/lobby.js";

export async function getValues(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "Values retrieved successfully" });
  } catch (error) {}
}

export async function holdDice(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

export async function getResults(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

export async function holdResult(req, res) {
  try {
    console.log(req.user);

    res.status(200).json({ message: "" });
  } catch (error) {}
}

 
