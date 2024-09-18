import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from './middleware/express-auth';
import { makeRouletteBet } from '../controllers/betController';
import { getCurrentRouletteStatus } from '../controllers/rouletteController';


const router = Router();

router.get('/current', getCurrentRouletteStatus)
router.post('/bet', isAuthenticated, makeRouletteBet)

export default router