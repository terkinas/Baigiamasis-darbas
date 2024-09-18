export interface IClientBet {
    amount: number;
    betType: string;
    user: {
        username: string;
    };
    roundId: number;
}