import express from 'express'; 
import { getGameState, getResults, getValues, throwDice, holdResult, holdDice } from '../controllers/logicController.js';

const router = express.Router();

router.get("/getValues", getValues)
router.get("/getResults", getResults)
router.get("/holdDice", holdDice)
router.get("/holdResult", holdResult)
router.get("/throwDice", throwDice)
router.get("/lobby/:lobbyId/gameState", getGameState);

export default router;
