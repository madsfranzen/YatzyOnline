import express from 'express'; 
import { getResults, getValues, holdDice } from '../controllers/logicController.js';

const router = express.Router();


router.get("/getValues", getValues);
router.get("/getResults", getResults());
router.get("/holdDice", holdDice());
router.get("/holdResult", holdResult());

export default router;
