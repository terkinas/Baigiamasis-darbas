import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { IClientUser } from '../types/client/user.interface';
import passportConfig from '../config/passportConfig';
import { createBitcoinWalletForUser, createLitecoinWalletForUser } from './cryptoController';
import { blackListedUsernames } from '../config/lists';

export const register = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        blackListedUsernames.includes(username) && res.status(400).json({ message: 'Username is not allowed' });

        const user = await userService.signUp({ username, password });

        if (!user) {
            return res.status(400).json({ message: 'Error registering user' });
        }

        await createBitcoinWalletForUser(user.id);
        await createLitecoinWalletForUser(user.id);

        let newUser = {
            id: user.id,
            username: user.username,
            balance: user.balance
        }

        await req.login(newUser, (error) => {
            if (error) {
                return res.status(400).json({ message: 'Internal server error while logging in' });
            }

            return res.json(newUser);
        }); 
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message || 'Error registering user' });
        }
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        const user = await userService.signIn({username, password});

        let newUser = {
            id: user.id,
            username: user.username,
            balance: user.balance
        }

        await req.login(newUser, (error) => {
            if (error) {
                return res.status(400).json({ message: 'Internal server error while logging in' });
            }

            return res.json(newUser);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message || 'Error logging in'});
        } else {
            res.status(400).json({ message: 'Error logging in'});
        }
    }
}

// also works without it
// passportConfig.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true,
// })


export const logout = async (req: Request, res: Response) => {
    req.logout((err) => err && res.status(400).json({ message: 'Error logging out' }));
    res.json({ message: 'Logged out' });
}

export const me = async (req: Request, res: Response) => {
    console.log('req.user', req.user)
    res.json(req.user);
}

export const userTransactions = async (req: Request, res: Response) => {

    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const page = req.query.page as string;

        if (!page || isNaN(parseInt(page)) || parseInt(page) < 1 || parseInt(page) > 100) {
            return res.status(400).json({ message: 'Page not found' });
        }

        const transactions = await userService.getUserTransactions(user.id, page);
        
        res.json({ transactions: transactions });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error retrieving user transactions' });
        }
    }
}

export const userRole = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const role = await userService.getUserRole(user.id);

        res.json({ role: role });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error retrieving user role' });
        }
    }
}

export const getWalletsForAdmin = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const page = req.query.page as string;

        if (!page || isNaN(parseInt(page)) || parseInt(page) < 1 || parseInt(page) > 100) {
            return res.status(400).json({ message: 'Page not found' });
        }

        const wallets = await userService.getWalletsForAdmin(page);

        res.json({ wallets: wallets });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error retrieving wallets' });
        }
    }
}

export const userRoleByUserId = async (userId: string) => {
    try {
        return await userService.getUserRole(userId);
    } catch (error) {
        throw new Error('Error while trying to get user role');
    }
}

export const userProfileStats = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        console.log('user trying get stats', user)

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const stats = await userService.getUserProfileStats(user.id);

        console.log('stats', stats)

        res.json({ stats: stats });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error retrieving user stats' });
        }
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old password and new password are required' });
        }

        await userService.changeUserPassword(user.id, oldPassword, newPassword);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error changing password' });
        }
    }
}

export const changeAvatar = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        const avatar = req.body.avatarId;

        if (!avatar) {
            return res.status(400).json({ message: 'Avatar is required' });
        }

        await userService.changeAvatar(user.id, avatar);

        res.json({ message: 'Avatar changed successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error changing avatar' });
        }
    }
}

export const claimCoinsReward = async (req: Request, res: Response) => {
    try {
        const user = req.user as IClientUser;

        if (!user || !user.id) {
            return res.status(400).json({ message: 'User not found' });
        }

        await userService.claimCoinsReward(user.id);

        res.json({ message: 'Coins claimed successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Error claiming coins' });
        }
    }
}