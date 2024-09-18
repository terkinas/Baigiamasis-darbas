import { Request, Response } from "express";
import { rouletteService } from "../services/rouletteService";


export const getCurrentRouletteStatus = async (req: Request, res: Response) => {
    try {
        const roulette = await rouletteService.getCurrentRouletteRound();
        const history = await rouletteService.getRouletteMiniHistory(10);

        return res.status(200).json({ roulette, history });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}