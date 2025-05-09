import express from 'express'; 
import { getValues } from '../controllers/logicController.js';

const router = express.Router();

router.get("/getValues", getValues);

export default router;
