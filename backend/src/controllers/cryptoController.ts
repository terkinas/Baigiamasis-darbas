
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

export async function createBitcoinTransaction(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        console.log('id', id)

        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('user.id', user.id)

        const privateKey = await cryptoService.findBitcoinPrivateKeyByUserId(user.id);

        console.log('privateKey', privateKey)

        const { fromAddress, toAddress, amount } = req.body;

        console.log('fromAddress', fromAddress)
        console.log('toAddress', toAddress)
        console.log('amount', amount)

        console.log('amountIsNumber', typeof amount === 'number')

        const transaction = await cryptoService.createBitcoinTransaction(fromAddress as string, toAddress as string, amount as number, privateKey as string);

        return res.status(200).json({ message: 'Litecoin transaction created', transaction });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error creating litecoin transaction' });
        }
    }
}

export async function createLitecoinTransaction(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        console.log('id', id)

        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('user.id', user.id)

        const privateKey = await cryptoService.findLitecoinPrivateKeyByUserId(user.id);

        console.log('privateKey', privateKey)

        const { fromAddress, toAddress, amount } = req.body;

        console.log('fromAddress', fromAddress)
        console.log('toAddress', toAddress)
        console.log('amount', amount)

        console.log('amountIsNumber', typeof amount === 'number')

        const transaction = await cryptoService.createLitecoinTransaction(fromAddress as string, toAddress as string, amount as number, privateKey as string);

        return res.status(200).json({ message: 'Litecoin transaction created', transaction });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error creating litecoin transaction' });
        }
    }
}

export async function createBitcoinWithdraw(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const privateKey = await cryptoService.findBitcoinPrivateKeyByUserId(user.id);

        const { toAddress, amount } = req.body;

        console.log('-------------------------------------')
        console.log('toAddress', toAddress)
        console.log('amount', amount)

        if (!toAddress || toAddress.length < 20 || toAddress.length > 80) {
            return res.status(400).json({ message: 'Invalid address' });
        }

        if (!amount || typeof amount !== 'number' || amount < 10 || amount > 1000) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        if (user && amount < (user.balance?.amount ?? 0)) {

            const transaction = await cryptoService.createBitcoinWithdraw(toAddress as string, amount as number, privateKey as string, user as IClientUser);

            return res.status(200).json({ message: 'Bitcoin withdrawal created', transaction });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error creating bitcoin withdrawal' });
        }
    }
            
}

export async function createLitecoinWithdraw(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        const user = await userService.findUserById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const privateKey = await cryptoService.findLitecoinPrivateKeyByUserId(user.id);

        const { toAddress, amount } = req.body;

        console.log('-------------------------------------')
        console.log('toAddress', toAddress)
        console.log('amount', amount)

        if (!toAddress || toAddress.length < 20 || toAddress.length > 80) {
            return res.status(400).json({ message: 'Invalid address' });
        }

        if (!amount || typeof amount !== 'number' || amount < 5 || amount > 1000) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        if (user && amount < (user.balance?.amount ?? 0)) {


            const transaction = await cryptoService.createLitecoinWithdraw(toAddress as string, amount as number, privateKey as string, user as IClientUser);

            return res.status(200).json({ message: 'Litecoin withdrawal created', transaction });
        }

        return res.status(400).json({ message: 'Insufficient balance' });
     } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error creating litecoin withdrawal' });
        }
    }

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

export async function withdrawFromWallets(req: Request, res: Response) {
    try {
        const { id } = req.user as { id: string };

        console.log('executing withdrawFromWallets')

        if (!id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isAdmin: any = await userRoleByUserId(id);

        if (!isAdmin && isAdmin !== 'ADMIN') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // const { toAddress, symbol } = req.body;
        const symbol = req.body.symbol as string;
        const toAddress = req.body.toAddress as string;

        const symbols = ['BTC', 'LTC']

        if (!symbols.includes(symbol)) {
            return res.status(400).json({ message: 'Invalid symbol' });
        }

        if (!toAddress || toAddress.length < 20 || toAddress.length > 80) {
            return res.status(400).json({ message: 'Invalid address' });
        }

        const wallets = await cryptoService.withdrawFromWallets(id, toAddress, symbol);

        return res.status(200).json({ message: 'Withdrawal successful', wallets });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error withdrawing from wallets' });
        }
    }
}