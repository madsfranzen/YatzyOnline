import express from 'express'
import { createPlayer, getPlayer, getPlayers } from '../controllers/playerController.js';


const router = express.Router();

router.post('', createPlayer)
router.get('/:id', getPlayer)
router.get('', getPlayers)

export default router;