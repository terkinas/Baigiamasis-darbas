export interface IClientBet {
    amount: number;
    betType: string;
    user: {
        username: string;
        avatarId: number;
    };
    roundId: number;
}