import { Router } from "express";
import { checkDepositStatus, createBitcoinTransaction, createBitcoinWithdraw, createLitecoinTransaction, createLitecoinWithdraw, retrieveUserCryptoAddress } from "../controllers/cryptoController";
import { isAuthenticated } from "./middleware/express-auth";


const router = Router();


router.post('/bitcoin/send', createBitcoinTransaction)

router.post('/bitcoin/withdraw', isAuthenticated, createBitcoinWithdraw)

// router.post('/litecoin/send', isAuthenticated, createLitecoinTransaction)
router.post('/litecoin/withdraw', isAuthenticated, createLitecoinWithdraw)

router.post('/litecoin/deposit', isAuthenticated, createLitecoinTransaction)

router.get('/address', isAuthenticated, retrieveUserCryptoAddress)

router.post('/deposit/check', isAuthenticated, checkDepositStatus)


export default router;