
import { Router } from 'express';
import { isAdmin, isAuthenticated } from './middleware/express-auth';
import { deleteMessage, getAllMessages, getRecentMessages, sendMessage } from '../controllers/livechatController';

const router = Router();

router.get('/messages', getRecentMessages);
router.get('/messages/all', isAdmin, getAllMessages);
router.delete('/messages/delete/:id', isAdmin, deleteMessage);
router.post('/messages', isAuthenticated, sendMessage)

export default router;