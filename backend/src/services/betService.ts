import { BetRepository } from "../database/repository/betRepository";
import { IClientBet } from "../types/client/bet.interface";


class BetService {

    private betRepository: BetRepository

    constructor() {
        this.betRepository = new BetRepository();
    }

    async placeBet({ amount, betType, userId, roundId }: { amount: number, betType: string, userId: string, roundId: number}): Promise<IClientBet> {
        try {   
            await this.betRepository.validateBetsCountLimit(userId, roundId)

            await this.betRepository.validateBetAmount(amount, userId)

            const bet = await this.betRepository.createBet({ amount, betType: betType.toLowerCase(), userId, roundId });

            if (!bet || bet == undefined) {
                throw new Error('Error placing bet');
            }

            return bet as IClientBet;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
                // console.error(error.message)
            } else {
                throw new Error('Error while trying to place bet');
            }
        }
    }

    // async getBetsByRoundId(roundId: number): Promise<IClientBet[]> {
    //     try {
    //         const bets = await this.betRepository.getBetsByRoundId(roundId);

    //         if (!bets || bets == undefined) {
    //             throw new Error('Error getting bets');
    //         }

    //         return bets as IClientBet[];
    //     } catch (error) {
    //         if(error instanceof Error) {
    //             throw new Error(error.message);
    //         } else {
    //             throw new Error('Error while trying to get bets');
    //         }
    //     }
    // }

}

export const betService = new BetService();