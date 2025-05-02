import express from 'express'
import { getLobbies } from '../controllers/lobbyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('', authenticateToken, getLobbies);

export default router;

