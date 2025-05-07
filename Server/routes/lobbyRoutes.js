import express from 'express'
import { getLobbies, createLobby, getLobbyByID } from '../controllers/lobbyController.js';

const router = express.Router();

router.get('', getLobbies);

router.get('/:lobbyID', getLobbyByID);

router.post('', createLobby);

export default router;

