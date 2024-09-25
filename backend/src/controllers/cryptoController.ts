
import { Request, Response } from "express";
import { cryptoService } from "../services/cryptoService";
import { userService } from "../services/userService";
import { userRoleByUserId } from "./userController";
import { IClientUser } from "../types/client/user.interface";

export function createBitcoinWalletForUser(userId: string) {
    return cryptoService.createBitcoinWallet({ userId });
}

export async function createLitecoinWalletForUser(userId: string) {
    return cryptoService.createLitecoinWallet({ userId });

}


export async function retrieveUserCryptoAddress(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        if (!id) {
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('req.body', req.query)

        const symbol = req.query.symbol as string;

        const symbols = ['BTC', 'LTC']
        console.log('symbol', symbol)

        if (!symbols.includes(symbol)) {
            return res.status(400).json({ message: 'Invalid symbol' });
        }


        const address = await cryptoService.retrieveUserCryptoAddress(id, symbol);
 
        return res.status(200).json({ message: 'Crypto address retrieved', address });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error retrieving crypto address' });
        }
    }
}

export async function checkDepositStatus(req: Request, res: Response) {
    try {
        console.log('trying to check deposit cryptoController')
        const { id } = req.user as { id: string };

        console.log('reqUser', req.user)
        console.log('id', id)

        if (!id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const symbol = req.body.symbol as string;

        const symbols = ['BTC', 'LTC']

        console.log('symbol', symbol)

        if (!symbols.includes(symbol)) {
            return res.status(400).json({ message: 'Invalid symbol' });
        }

        console.log('cryptoController 1')

        const status = await cryptoService.checkDepositStatus(id, symbol);


        if (!status) {
            return res.status(200).json({ message: 'No new deposits found' });
        }

        return res.status(200).json({ message: 'Deposit status retrieved', status });
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('error', error)
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error retrieving information' });
        }
    }
}