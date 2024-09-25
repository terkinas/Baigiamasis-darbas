import { Router } from "express";
import { checkDepositStatus, retrieveUserCryptoAddress } from "../controllers/cryptoController";
import { isAuthenticated } from "./middleware/express-auth";


const router = Router();

router.get('/address', isAuthenticated, retrieveUserCryptoAddress)

router.post('/deposit/check', isAuthenticated, checkDepositStatus)


export default router;