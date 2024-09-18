import schedule from 'node-schedule';
import { schedulesConfig } from '../config/schedulesConfig';
import { rouletteService } from '../services/rouletteService';
import { botService } from '../services/botService';


export function initSchedules() {
    let roundId: number;
    let previousRoundId: number;
    let previousTime: number;

    async function rouletteJob() {
        console.log('gap between calls: ', Date.now() - previousTime, ' milliseconds');
        const startTime = performance.now();

        if (roundId && roundId !== previousRoundId) {
            console.log('round id now: ', roundId);
            await rouletteService.stopBets(roundId);
            await rouletteService.spinRouletteWheel(roundId);
            await rouletteService.settleRoundRewards(roundId);
        }

        previousRoundId = roundId;
        roundId = await rouletteService.startNewRound();
        if (roundId) {
            botsJob(roundId);
        }

        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log('Total execution time: ', executionTime, 'milliseconds');

        previousTime = Date.now();
        
        setTimeout(rouletteJob, 30000); // 48 seconds in milliseconds
    }

    rouletteJob();


    async function botsJob(roundId: number) {
        await botService.runBots(roundId);
    }
}