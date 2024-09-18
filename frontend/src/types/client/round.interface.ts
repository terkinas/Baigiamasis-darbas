import { IClientBet } from "./bet.interface";

export interface IClientRouletteRound {
    id: number;
    isOpen: boolean;
    outcome?: string | null;
    outcomeNumber?: number | null;
    createdAt: Date;
    updatedAt: Date;
    bets?: IClientBet[]
}