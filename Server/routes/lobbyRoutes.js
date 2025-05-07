import express from 'express'
import { getLobbies, createLobby } from '../controllers/lobbyController.js';

const router = express.Router();

router.get('', getLobbies);

router.post('', createLobby);

export default router;

