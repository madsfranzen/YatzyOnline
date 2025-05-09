import express from 'express'; 
<<<<<<< Updated upstream
import { getResults, getValues, holdDice } from '../controllers/logicController.js';
=======
import { getValues, throwDice } from '../controllers/logicController.js';
>>>>>>> Stashed changes

const router = express.Router();

router.get("/getValues", getValues);
<<<<<<< Updated upstream
router.get("/getResults", getResults());
router.get("/holdDice", holdDice());
router.get("/holdResult", holdResult());
=======
router.get("/throwDice", throwDice)
>>>>>>> Stashed changes

export default router;
