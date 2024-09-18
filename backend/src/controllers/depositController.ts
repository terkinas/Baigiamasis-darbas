import { Request, Response } from "express";
import { depositService } from "../services/depositService"
import { sanitize } from "../utils/helper";
import { IClientUser } from "../types/client/user.interface";

export const checkDepositWallet = async (req: Request, res: Response) => {
    try {
        const { walletId, currency } = req.body;

        const user = req.user as IClientUser;

        if (!user || user.id == null) {
            return res.status(400).json({ message: 'User not found' });
        }

        const sanitizedCurrency = sanitize(currency);

        // first check wallet, maybe already deposited
        try {
            const clientDeposit = await depositService.checkWalletDeposits({ userId: user.id, walletId, currency: sanitizedCurrency });

            if (clientDeposit == false || clientDeposit == null) {
                
            } else {
                if (clientDeposit) {
                    return res.json({ 
                        message: 'Deposit completed!',
                        clientDeposit
                     });
                }
            }
        } catch (error) {
            // continue
        }
        

        try {
            const isDepositAlreadyBeingChecked = await depositService.checkIfDepositIsBeingChecked({ userId: user.id, walletId, currency: sanitizedCurrency });

            if (isDepositAlreadyBeingChecked) {
                return res.json({ message: 'Deposit wallet is already being checked. Please wait.' });
            }
            
            const clientDeposit = await depositService.addToCheckListWallet({ currency: sanitizedCurrency, userId: walletId })

            res.json({ 
                message: 'Verifying deposit wallet. Please wait.',
                clientDeposit
            });
        } catch (error) {
            throw new Error('Error while trying to check deposit wallet');
        }

    } catch (error) {
        throw new Error('Error while trying to check deposit wallet');
    }
}