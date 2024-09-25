
import { DefaultArgs, Omit, PrismaClientOptions } from "@prisma/client/runtime/library";
import prisma from "../../utils/prisma"
import { Prisma, PrismaClient } from "@prisma/client";
import { IClientBet } from "../../types/client/bet.interface";

export class BetRepository {

    async createBet({ amount, betType, userId, roundId }: { amount: number, betType: string, userId: string, roundId: number }): Promise<IClientBet | undefined> {
        try {
            // console.log('createBet: amount:', amount, 'betType:', betType, 'userId:', userId, 'roundId:', roundId)
            const roundIsOpen = (await prisma.round.findFirst({
                where: { id: roundId },
                select: { isOpen: true }
            }))?.isOpen;

            if (!roundIsOpen) {
                throw new Error('Round is not open.');
            }

            const gameId = (await prisma.round.findFirst({
                where: { id: roundId },
                select: { gameId: true }
            }))?.gameId;

            if (!gameId) {
                throw new Error('Game not found.');
            }

            await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                try {
                    const userBalance = await tx.balance.findFirstOrThrow({
                        where: { userId: userId },
                        select: { 
                            id: true,
                            amount: true
                         }
                    });
    
                    if(!userBalance) {
                        throw new Error('User balance not found.');
                    }
    
                    const newAmount = userBalance.amount - amount;
                    if (userBalance.amount < 0) {
                        throw new Error('Insufficient funds.');
                    }
    
                    await tx.balance.update({
                        where: { id: userBalance.id },
                        data: { 
                            amount: newAmount
                        }
                    })
    
                    return tx
                } catch (error) {
                    if(error instanceof Error) {
                        // throw new Error(error.message);
                        // console.error(error.message)
                        return error;
                    } else {
                        throw new Error('Error while trying to place bet');
                    
                    }
                }
            })

            // console.log('createBet done: gameId:', gameId)

            return await prisma.bet.create({
                data: {
                    amount,
                    betType,
                    userId,
                    roundId,
                    gameId
                },
                select: {
                    amount: true,
                    betType: true,
                    user: {
                        select: {
                            username: true,
                            avatarId: true
                        }
                    },
                    roundId: true
                }
            });
        } catch (error) {
            if(error instanceof Error) {
                // throw new Error(error.message);
                console.error(error.message)
            }
        }
    }

    async validateBetAmount(amount: number, userId: string) {
        try {

            if (amount < 0) {
                throw new Error('Invalid amount.');
            }

            if (amount > 10000000) {
                throw new Error('Maximum bet amount is 10000.');
            }
            
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    balance: {
                        where : { userId },
                        select: {
                            amount: true
                        }
                    }
                }
            });

            console.log('valiteBetAmount: user:', user);

            if (!user) {
                throw new Error('User not found.');
            }

            if (user.balance && user.balance.amount < amount) {
                throw new Error('Insufficient funds.');
            }

            return true;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async validateBetsCountLimit(userId: string, roundId: number) {
        try {
            const betsCount = await prisma.bet.count({
                where: { userId, roundId }
            });

            if (betsCount >= 5) {
                throw new Error('Bets limit reached.');
            }

            return true;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

}