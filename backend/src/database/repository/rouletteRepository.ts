import { IClientRouletteCurrent } from "../../types/client/roulette.interface";
import { IClientRouletteRound } from "../../types/client/round.interface";
import prisma from "../../utils/prisma";

export class RouletteRepository {
    async findRouletteGameId(): Promise<number> {
        try {
            const gameId = (await prisma.game.findFirst({ 
                where: { name: 'roulette' },
                select: { id: true }
             }))?.id;

            if (!gameId) {
                throw new Error('Roulette game not found.');
            }

            return gameId as number
        } catch (error) {
            console.error('Error finding roulette game:', error);
            throw error;
        }
    }

    async createRound() {
        try {
            const gameId = await this.findRouletteGameId()

             if (!gameId) {
                throw new Error('Roulette game not found.');
            }

            // const roundId = (await prisma.round.create({
            //     data: {
            //         isOpen: true,
            //         game: {
            //             connect: {
            //                 id: gameId
            //             }
            //         }
            //     },
            //     select: { id: true }
            // })).id as number; 

            const round = (await prisma.round.create({
                data: {
                    isOpen: true,
                    game: {
                        connect: {
                            id: gameId
                        }
                    }
                },
                select: { 
                    id: true,
                    isOpen: true,
                    outcome: true,
                    createdAt: true,
                    updatedAt: true
                }
            }))

            console.log('Round created successfully.');
            return round;
        } catch (error) {
            console.error('Error creating round:', error);
            throw error;
        }
    }

    async closeRound(roundId: number): Promise<IClientRouletteRound> {
        try {
            const gameId = await this.findRouletteGameId()

            if (!gameId) {
                throw new Error('Roulette game not found.');
            }

            roundId = (await prisma.round.findFirst({
                where: { 
                    id: roundId,
                    gameId: gameId,
                    isOpen: true
                 },
                select: { id: true }
            }))?.id as number

            if (!roundId) {
                throw new Error('closeRound:No open round found.');
                // console.log('No open round found.');
                
            }

            const round = await prisma.round.update({
                where: { 
                    id: roundId
                 },
                data: { isOpen: false },
                select: { 
                    id: true,
                    isOpen: true,
                    outcome: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!round) {
                throw new Error('Error closing round.');
            }

            console.log('Round closed successfully.');
            return round;
        } catch (error) {
            console.error('Error closing round:', error);
            throw error;
        }
    }

    async setRoundOutcome (roundId: number, outcome: string, outcomeNumber: number): Promise<IClientRouletteRound> {
        try {
            console.log('Setting round outcome:', outcome)

            const gameId = await this.findRouletteGameId()

            if (!gameId) {
                throw new Error('Roulette game not found.');
            }

            roundId = (await prisma.round.findFirst({
                where: { 
                    id: roundId,
                 },
                select: { id: true }
            }))?.id as number

            if (!roundId) {
                throw new Error('No open round found.');
            }

            if (outcomeNumber < 0 || outcomeNumber > 14) {
                throw new Error('Invalid outcome number.');
            }

            const round = await prisma.round.update({
                where: { 
                    id: roundId
                 },
                data: { 
                    outcome: outcome,
                    outcomeNumber: outcomeNumber
                 },
                select: { 
                    id: true,
                    isOpen: true,
                    outcome: true,
                    outcomeNumber: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!round) {
                throw new Error('Error setting round outcome.');
            }

            console.log('Round outcome set successfully.');

            return round;
        } catch (error) {
            console.error('Error setting round outcome:', error);
            throw error;
        }
    }

    async findOpenRoundId() {
        try {
            const openRoundId = (await prisma.round.findFirst({
                where: { isOpen: true },
                select: { id: true }
            }))?.id
    
            if (openRoundId) {
                console.log('Found open round:', openRoundId);
                return openRoundId;
            } else {
                console.log('No open round found.');
                return null;
            }
        } catch (error) {
            console.error('Error finding open round:', error);
            throw error;
        }
    }

    async settleRoundRewards(roundId: number) {
        try {

            console.log('Settling round rewards:', roundId);

            const round = await prisma.round.findUnique({
                where: { id: roundId },
                include: {
                    bets: true
                }
            })

            // console.log('Round:', round);

            if (!round || round.outcome == null) {
                throw new Error('Settle:Round not found.');
            }

            if (round.bets.length === 0) {
                console.log('No bets to settle.');
                return;
            }

            const winningBets = round.bets.filter(bet => bet.betType === round.outcome);

            // check if there is any winners
            // console.log('Winning bets:', winningBets);

            const multiplier = round.outcome === 'green' ? 14 : 2;

            const userTotalAmounts: Record<string, number> = winningBets.reduce((acc: Record<string, number>, bet) => {
                const userId: string = bet.userId;
                const amount: number = bet.amount;
                acc[userId] = (acc[userId] || 0) + amount;
                return acc;
            }, {});

            // console.log('User total amounts:', userTotalAmounts);

            await Promise.all(Object.entries(userTotalAmounts).map(([userId, totalAmount]) => {
                const multiplier = round.outcome === 'green' ? 14 : 2;
                const totalIncrement = totalAmount * multiplier;
            
                return prisma.balance.update({
                    where: { userId },
                    data: {
                        amount: {
                            increment: totalIncrement
                        }
                    }
                });
            }));

            // await prisma.balance.updateMany({
            //     where: {
            //         userId: {
            //             in: winningBets.map(bet => bet.userId)
            //         }
            //     },
            //     data: {
            //         amount: {
            //             increment: winningBets.reduce((acc, bet) => {
                            
            //                 console.log('Multiplier:', multiplier);
            //                 return acc + bet.amount * multiplier;
            //             }, 0)
            //         }
            //     }
            // })

            const bets = await prisma.bet.updateMany({
                where: {
                    roundId: roundId
                },
                data: {
                    isSettled: true,
                    outcome: round.outcome
                },
            })

            // const users = await prisma.user.findMany({
            //     where: { id: { in: updatedBets.map(bet => bet.userId) } }
            // });
            
            // const betsWithUsers = updatedBets.map(bet => ({ ...bet, user: users.find(user => user.id === bet.userId) }));

            // console.log(bets)

            return bets
        } catch (error) {
            console.error('Error settling round rewards:', error);
            throw error;
        }
    }

    async getCurrentRound(): Promise<IClientRouletteCurrent> {
        try {
            const gameId = await this.findRouletteGameId()

            const round = await prisma.round.findFirst({
                orderBy: {
                    createdAt: 'desc' // Assuming there's a createdAt field indicating the creation time
                },
                where: {
                    gameId: gameId
                },
                select: {
                    id: true,
                    isOpen: true,
                    outcome: true,
                    updatedAt: true,
                    createdAt: true,
                    bets: {
                        select: {
                            amount: true,
                            betType: true,
                            user: {
                                select: {
                                    username: true
                                }
                            },
                            roundId: true
                        }
                    }
                }
            })

            if (!round) {
                console.log('No open round found.');
                throw new Error('No open round found.');
            }

            console.log('Current round:', round);

            return round;
        } catch (error) {
            console.error('Error getting current round:', error);
            throw error;
        }
    }

    async getRouletteHistory(limit: number): Promise<IClientRouletteRound[]> {
        try {
            const gameId = await this.findRouletteGameId()

            const rounds = await prisma.round.findMany({
                where: {
                    gameId: gameId,
                    isOpen: false
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: limit,
                select: {
                    id: true,
                    isOpen: true,
                    outcome: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return rounds;
        } catch (error) {
            console.error('Error getting roulette history:', error);
            throw error;
        }
    }

    async getRouletteMiniHistory(limit: number): Promise<String[]> {
        try {
            const gameId = await this.findRouletteGameId()

            const rounds = await prisma.round.findMany({
                where: {
                    gameId: gameId,
                    isOpen: false,
                    outcome: { not: { equals: 'cancelled' } }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: limit,
                select: {
                    outcome: true
                }
            })

            const outcomes: string[] = rounds.map(round => round.outcome).filter(outcome => outcome !== null) as string[];

            return outcomes
        } catch (error) {
            console.error('Error getting roulette mini history:', error);
            throw error;
        }
    }
}
