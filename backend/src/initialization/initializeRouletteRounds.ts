
import { roundsToSeed } from "../../prisma/seeds/rounds";
import prisma from "../utils/prisma"

// export const initializeRouletteRounds = async () => {
//     try {
//         const games = await prisma.game.findMany()

//         roundsToSeed.map(round => ({
//             isOpen: round.isOpen,
//             gameId: games.find(game => game.name === round.gameName)?.id || 0 // Default value if gameId is undefined
//         }));

//         await prisma.round.createMany({
//             data: {
//                 isOpen: true,
//                 gameId: games.find(game => game.name === 'roulette')?.id || 0
//             },
//         });

//         return true
//     } catch (error) {
//         console.error('Error initializing rounds:', error);
//         throw error;
//     }
// }

export const clearPreviousRounds = async () => {
    try {
        const rounds = await prisma.round.findMany({
            where: { outcome: null },
            include: { bets: true }
        })

        if (rounds.length === 0) {
            console.log('No rounds to clear.');
            return;
        }

        
        // const winningBets = rounds.bets.filter(bet => bet.outcome === round.outcome);

        rounds.map(async (round) => {
            await prisma.balance.updateMany({
                where: {
                    userId: {
                        in: round.bets.map(bet => bet.userId)
                    }
                },
                data: {
                    amount: {
                        increment: round.bets.reduce((acc, bet) => {
                            return acc + bet.amount
                        }, 0)
                    }
                }
            })

            await prisma.bet.updateMany({
                where: {
                    roundId: round.id
                },
                data: {
                    isSettled: true,
                    outcome: 'cancelled'
                },
            })
        })

        await prisma.round.updateMany({
            where: {
                OR: [
                    { outcome: null }, // Check for null outcome
                    { outcome: 'cancelled' } // Check for "cancelled" outcome
                  ],
            },
            data: {
                isOpen: false,
                outcome: 'cancelled'
            }
        })


        return
    } catch (error) {
        console.error('Error clearing rounds:', error);
        throw error;
    }
}