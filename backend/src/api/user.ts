import { Router } from 'express';
import {  changeAvatar, changePassword, claimCoinsReward, disableUserMessages, getAllTransactions, getUserList, getWalletsForAdmin, login, logout, me, register, userProfileStats, userRole, userTransactions } from '../controllers/userController';
import { isAdmin, isAuthenticated, isNotAuthenticated } from './middleware/express-auth';
import { userRegistrationLimit } from './middleware/userRegistrationLimit';

const router = Router();

router.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello from user route');
});

router.post('/register', isNotAuthenticated, register);
router.post('/login', isNotAuthenticated, login)
router.post('/logout', isAuthenticated, logout)

router.get('/me', isAuthenticated, me)
router.get('/me/role', isAuthenticated, userRole)
router.get('/me/transactions', isAuthenticated, userTransactions)
router.get('/me/stats', isAuthenticated, userProfileStats)
router.post('/me/password', isAuthenticated, changePassword)
router.post('/me/avatar', isAuthenticated, changeAvatar)

router.post('/me/claim-reward', isAuthenticated, claimCoinsReward)

router.get('/admin/wallets', isAdmin, getWalletsForAdmin)
router.get('/admin/users', isAdmin, getUserList)
router.get('/admin/transactions', isAdmin, getAllTransactions)
router.post('/admin/messages/disable/:id', isAdmin, disableUserMessages)


export default router