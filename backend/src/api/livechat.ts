
import { Router } from 'express';
import { isAuthenticated } from './middleware/express-auth';
import { getRecentMessages, sendMessage } from '../controllers/livechatController';

const router = Router();

router.get('/messages', getRecentMessages);
router.post('/messages', isAuthenticated, sendMessage)

export default router;