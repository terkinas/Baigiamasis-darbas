import { Request, Response, NextFunction } from 'express';
import prisma from "../../utils/prisma";

export const userRegistrationLimit = (req: Request, res: Response, next: NextFunction) => {
    console.log('userRegistrationLimit', req.ip)

    const requestCounter = prisma.requestCounter.findFirst({
        where: {
            ip: req.ip || 'unknown',
            endpoint: 'user/register'
        }
    
    })

    // if (requestCounter && requestCounter.createdAt > new Date(Date.now() - 60000) && requestCounter.count > 5{
    //     return res.status(429).json({ message: 'Too many requests' });
    // }

    const newRequestCounter = prisma.requestCounter.create({
        data: {
            ip: req.ip || 'unknown',
            count: 1,
            endpoint: 'user/register'
        }
    })

    next();
}