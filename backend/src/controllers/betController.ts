import { Request, Response } from "express";
import { betService } from "../services/betService";
import { IClientUser } from "../types/client/user.interface";
import { userService } from "../services/userService";
import { getSocketInstance } from "../config/socketConfig";
import { IClientBet } from "../types/client/bet.interface";


export const makeRouletteBet = async (req: Request, res: Response) => {
    try {
        const { amount, betType, roundId } = req.body;

        console.log(req.body)

        const user = req.user as IClientUser;

        if (!user || user.id == null) {
            return res.status(400).json({ message: 'User not found' });
        }

        const bet = await betService.placeBet({ amount, betType, userId: user.id, roundId });

        // emit bet to all clients
        const io = getSocketInstance();

        io.emit("roulette:bet", bet as IClientBet)


        const updatedUser = await userService.findUserById(user.id);

        return res.json({ user: updatedUser });

    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(400).json({ message: 'Error making bet' });
        }
    }
}