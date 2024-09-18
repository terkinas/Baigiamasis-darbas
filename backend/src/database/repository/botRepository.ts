import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { botList, botUsernamesList } from "../../config/bots";
import { IClientUser } from "../../types/client/user.interface";
import { IServerUser } from "../../types/server/user.interface";
import prisma from "../../utils/prisma";
import { getSocketInstance } from "../../config/socketConfig";
import { IClientMessage } from "../../types/client/message.interface";

export class BotRepository {

    async getNumberOfBots(numberOfBots: number) {
        try {
            // console.log('botList', botList)

            const randomBotUsernames = botUsernamesList.sort(() => Math.random() - Math.random()).slice(0, numberOfBots);

            const bots = await prisma.user.findMany({
                where: {
                    username: {
                        in: randomBotUsernames
                    }
                },
                take: numberOfBots
            });

            // console.log('bots', bots)

            return bots;
        } catch (error) {
            if(error instanceof Error) {
                // throw new Error(error.message);
                console.error(error.message)
            } else {
                // throw new Error('Error while trying to get number of bots');
            }
        }
    }

    async getNumberOfWealthyBots(numberOfBots: number) {
        try {
            // console.log('botList', botList)

            // wealthy bot names
            const wealthyBotUsernames = ['finland1', 'senator']

            const bots = await prisma.user.findMany({
                where: {
                    username: {
                        in: wealthyBotUsernames
                    }
                },
                take: numberOfBots
            });


            // const bots = await prisma.user.findMany({
            //     where: {
            //         username: {
            //             in: randomBotUsernames
            //         }
            //     },
            //     take: numberOfBots
            // });

            // console.log('bots', bots)

            return bots;
        } catch (error) {
            if(error instanceof Error) {
                // throw new Error(error.message);
                console.error(error.message)
            } else {
                // throw new Error('Error while trying to get number of bots');
            }
        }
    }

    async createBot({ username, password }: IServerUser) {
        try {
            return await prisma.user.create({ 
                data: {
                    username: username.toLowerCase(),
                    password,
                    role: 'BOT',
                    balance: {
                        create: {
                            amount: 1000000000
                        }
                    
                    }
                },
                select: {
                    id: true,
                    username: true,
                    balance: {
                        select: {
                            amount: true
                        }
                    }
                }
             }) as IClientUser;

        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                // throw new Error('Username is already taken.');
                console.log('Username is already taken.')
            } else {
                // throw new Error('Error while trying to create user');
            }
        }
    }

    async addMessage({ userId, message }: { userId: string, message: string }): Promise<IClientMessage | undefined> {
        try {
            const newMessage = await prisma.message.create({
                data: {
                    content: message,
                    userId
                },
                select: {
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            });

            return newMessage;
        } catch (error) {
            console.error('Error while adding message:', error);
            if (error instanceof Error) {
                throw error;
            }
        }
    }
}

export const botRepository = new BotRepository();