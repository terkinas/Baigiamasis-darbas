import { IClientBet } from "./bet.interface";

export interface IClientRouletteCurrent {
    id: number;
    isOpen: boolean;
    outcome?: string | null;
    createdAt: Date;
    bets?: IClientBet[],
    history?: []
}