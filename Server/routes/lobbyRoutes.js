import express from "express";
import {
  getLobbies,
  createLobby,
  getLobbyByID,
  joinLobby,
  leaveLobby,
} from "../controllers/lobbyController.js";

const router = express.Router();

router.get("", getLobbies);

router.post("", createLobby);

router.get("/:lobbyID", getLobbyByID);

router.post("/:lobbyid", joinLobby);

router.delete("/:lobbyid", leaveLobby);

export default router;
