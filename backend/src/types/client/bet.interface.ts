export interface IClientBet {
    amount: number;
    betType: string;
    user: {
        username: string;
        avatarId: number | null;
    };
    roundId: number;
}

// amount: true,
//                     betType: true,
//                     user: {
//                         select: {
//                             username: true
//                         }
//                     },
//                     roundId: true