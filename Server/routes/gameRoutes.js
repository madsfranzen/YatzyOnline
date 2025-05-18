import express from "express";
import {
  createGame,
  holdResult,
  rollDice,
} from "../controllers/gameController.js";

const router = express.Router();

router.post("/", createGame);
router.post("/roll", rollDice);
router.post("/holdResult", holdResult);

export default router;
