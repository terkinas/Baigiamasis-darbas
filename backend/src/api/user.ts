import { Router } from 'express';
import {  getWalletsForAdmin, login, logout, me, register, userProfileStats, userRole, userTransactions } from '../controllers/userController';
import { isAdmin, isAuthenticated, isNotAuthenticated } from './middleware/express-auth';
import { withdrawFromWallets } from '../controllers/cryptoController';
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

router.get('/admin/wallets', isAdmin, getWalletsForAdmin)

// crypto controller use
router.post('/admin/wallets/withdraw', isAdmin, withdrawFromWallets)

export default router