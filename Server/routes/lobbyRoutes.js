import express from 'express'
import { getLobbies } from '../controllers/lobbyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('', getLobbies);

export default router;

