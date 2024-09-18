import { getSocketInstance } from "../config/socketConfig";
import { RouletteRepository } from "../database/repository/rouletteRepository";
import { IClientRouletteCurrent } from "../types/client/roulette.interface";
import { IClientRouletteRound } from "../types/client/round.interface";


export class RouletteService {
    private GREEN_PROBABILITY = 1 / 15;
    private RED_PROBABILITY = 7 / 15;
    private BLACK_PROBABILITY = 7 / 15;

    private rouletteRepository: RouletteRepository;

    constructor() {
        this.rouletteRepository = new RouletteRepository();
    }

    public async spinRouletteWheel(roundId: number): Promise<void> {

        const outcome: string = await this.generateRandomOutcome();

        const outcomeNumber = await this.generateRandomOutcomeNumber(outcome);
        
        const round = await this.rouletteRepository.setRoundOutcome(roundId, outcome, outcomeNumber);

        // emit outcome to clients
        const io = getSocketInstance();

        io.emit("roulette:round", round as IClientRouletteRound)

        console.log('Spinning roulette wheel');
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log('Roulette wheel has stopped spinning');

        return
    }

    public async startNewRound(): Promise<number> {
        // const roundId = await this.rouletteRepository.createRound();
        const round = await this.rouletteRepository.createRound();

        const roundObject = {
            id: round.id,
            isOpen: round.isOpen,
            outcome: round.outcome,
            createdAt: round.createdAt,
            updatedAt: round.updatedAt
        }

        const io = getSocketInstance();
        io.emit("roulette:round", roundObject as IClientRouletteRound)
        

        console.log('New round is open. (id):', round.id);
        // return new Promise(resolve => setTimeout(resolve, 0));
        return round.id;
    }

    public async stopBets(roundId: number): Promise<void> {
        try {
            const round = await this.rouletteRepository.closeRound(roundId);

            // emit round closed to clients
            const io = getSocketInstance();
            io.emit("roulette:round", round as IClientRouletteRound)

            console.log('stopbets:Round is closed.');
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Error while trying to close round');
            
            }
        }
        
    }

    public async settleRoundRewards(roundId: number): Promise<void> {

        const bets = await this.rouletteRepository.settleRoundRewards(roundId);

        // emit round settled to clients

        console.log('settleService:Round has ended.');
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    public getRoundOpenStatus(): boolean {
        // return this.isRoundOpen;
        return true
    }

    public async getCurrentRouletteRound(): Promise<IClientRouletteCurrent> {
        try {
            return this.rouletteRepository.getCurrentRound();
        } catch (error) {
            throw new Error('Error while trying to get current round');
        }
    }

    public async getRouletteHistory(limit: number): Promise<IClientRouletteRound[]> {
        return this.rouletteRepository.getRouletteHistory(limit);
    }

    public async getRouletteMiniHistory(limit: number): Promise<String[]> {
        return this.rouletteRepository.getRouletteMiniHistory(limit);
    }


    private generateRandomOutcome(): Promise<string> {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random();

            if (randomNumber < this.GREEN_PROBABILITY) {
                resolve('green');
            } else if (randomNumber < this.GREEN_PROBABILITY + this.RED_PROBABILITY) {
                resolve('red');
            } else {
                resolve('black');
            }
        })
    }

    private generateRandomOutcomeNumber(outcome: string): Promise<number> {
        return new Promise((resolve, reject) => {
            switch (outcome) {
                case 'green':
                    resolve(0);
                    break;
                case 'red':
                    resolve(Math.floor(Math.random() * 7) + 1);
                    break;
                case 'black':
                    resolve(Math.floor(Math.random() * 7) + 8);
                    break;
                default:
                    reject('Invalid outcome');
            }
        })
    
    
    }
}

export const rouletteService = new RouletteService();