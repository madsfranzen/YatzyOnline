import express from 'express'
import { login, logOut, getMe, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logOut);
router.get('/me', getMe);

export default router;

