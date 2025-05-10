import express from 'express'
import { createGame, rollDice } from '../controllers/gameController.js';

const router = express.Router();

router.post("/", createGame)
router.post("/roll", rollDice)

export default router;

