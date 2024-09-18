import { Request, Response, NextFunction } from 'express';
import { IClientUser } from '../../types/client/user.interface';
import { userRoleByUserId } from '../../controllers/userController';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log('req.isAuthenticated()', req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ 
        message: 'Unauthorized',
     });
}

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(400).json({ message: 'Already authenticated' });
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IClientUser;

    if (!user || !user.id) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isAdmin: any = await userRoleByUserId(user.id);

    console.log('isAdmin', isAdmin)

    if (isAdmin && isAdmin === 'ADMIN') {
        return next();
    }
   
    res.status(401).json({ message: 'Unauthorized' });
}