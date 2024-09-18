import { botBetAmounts, botLivechatMessages, botUsernamesList } from "../config/bots";
import { getSocketInstance } from "../config/socketConfig";
import { BetRepository } from "../database/repository/betRepository";
import { botRepository, BotRepository } from "../database/repository/botRepository";
import { userRepository } from "../database/repository/userRepository";
import { IClientBet } from "../types/client/bet.interface";
import { IClientMessage } from "../types/client/message.interface";
import { liveChatService } from "./livechatService";



class BotService {

    private GREEN_PROBABILITY = 2 / 12;
    private RED_PROBABILITY = 7 / 12;
    private BLACK_PROBABILITY = 7 / 15;

    private botRepository: BotRepository;
    private betRepository: BetRepository;


    constructor() {
        this.botRepository = new BotRepository();
        this.betRepository = new BetRepository();
    }

    async runBots(roundId: number) {
        try {

            await this.botInitialBets(roundId);

            await this.botRandomBetting(roundId);

            var hourNow = new Date().getHours();
            if (hourNow < 24 && hourNow > 19) {
                await this.wealthyBotBetting(roundId);
            }

            // console.log('running bots, round:', roundId)
        } catch (error) {
            if(error instanceof Error) {
                // throw new Error(error.message);
            } else {
                // throw new Error('Error while trying to run bots');
            }
        }
    }

    async botInitialBets(roundId: number) {
        try {

            // console.log('initial bets running')
            const numberOfBots = Math.floor(Math.random() * 5) + 2;
            const bots = await this.botRepository.getNumberOfBots(numberOfBots);

            if (!bots) {
                return;
            }

            if (bots.length < 1) {
                return
            }

            if (!roundId) {
                return
            }

            const io = getSocketInstance();

            bots.forEach(async (bot, index) => {
                let amount = botBetAmounts[Math.floor(Math.random() * botBetAmounts.length)] * 100;
                let betType = await this.generateRandomOutcome()
                
                setTimeout(async () => {
                    const bet = await this.betRepository.createBet({ amount, betType: betType.toLowerCase(), userId: bot.id, roundId });

                    // console.log('new by by', bot.username)
                    if (!bet || bet == undefined || !io) {
                        console.error('Error placing bet');
                        return
                    }

                    io.emit("roulette:bet", bet as IClientBet)

                }, 250*index);
            })

        } catch (error) {
            if(error instanceof Error) {
                // throw new Error(error.message);
            } else {
                // throw new Error('Error while trying to run bots');
            }
        }
    }

    async botRandomBetting(roundId: number) {
        try {

            // console.log('random bets running')
            const numberOfBots = Math.floor(Math.random() * 30) + 10;
            const bots = await this.botRepository.getNumberOfBots(numberOfBots);


            if (!bots) {
                return;
            }

            if (!roundId) {
                return
            }


            const io = getSocketInstance();

            bots.forEach(async (bot, index) => {
                let isRandomAmount = Math.random() < 0.9;
                let amount = isRandomAmount ? botBetAmounts[Math.floor(Math.random() * botBetAmounts.length)] * 100 : Math.floor(Math.random() * 2000);
                let betType = await this.generateRandomOutcome()

                
                
                setTimeout(async () => {
                    const bet = await this.betRepository.createBet({ amount, betType: betType.toLowerCase(), userId: bot.id, roundId });
                    
                    // console.log('new by by', bot.username)
                    if (!bet || bet == undefined || !io) {
                        console.error('Error placing bet');
                        return
                    }

                    io.emit("roulette:bet", bet as IClientBet)

                    if (betType == 'green') {
                        Math.random() < 0.01 && this.botSendMessage();
                        // this.botSendMessage();
                    }
                    
                }, Math.floor(Math.random() * 29000) + 1000);
            })

        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            } else {
                // throw new Error('Error while trying to run bots');
            }
        }
    }

    async wealthyBotBetting(roundId: number) {
        try {

            // console.log('random bets running')
            // const numberOfBots = Math.floor(Math.random() * 2) + 2;
            const numberOfBots = 2
            const bots = await this.botRepository.getNumberOfWealthyBots(numberOfBots);


            if (!bots) {
                return;
            }

            if (!roundId) {
                return
            }


            const io = getSocketInstance();

            bots.forEach(async (bot, index) => {
                let isRandomAmount = Math.random() < 0.9;
                let amount = isRandomAmount ? botBetAmounts[Math.floor(Math.random() * botBetAmounts.length)] * 200 : Math.floor(Math.random() * 5000);
                let betType = await this.generateRandomOutcome()

                if (amount < 100) {
                    amount = amount * 10;
                }


                if (amount < 200) {
                    amount = amount * 20;
                }


                
                
                setTimeout(async () => {
                    const bet = await this.betRepository.createBet({ amount, betType: betType.toLowerCase(), userId: bot.id, roundId });
                    
                    // console.log('new by by', bot.username)
                    if (!bet || bet == undefined || !io) {
                        console.error('Error placing bet');
                        return
                    }

                    io.emit("roulette:bet", bet as IClientBet)

                    // if (betType == 'green') {
                    //     Math.random() < 0.1 && this.botSendMessage();
                    //     // this.botSendMessage();
                    // }
                    
                }, Math.floor(Math.random() * 29000) + 1000);
            })

        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            } else {
                // throw new Error('Error while trying to run bots');
            }
        }
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

    private async botSendMessage() {
        const message = botLivechatMessages[Math.floor(Math.random() * botLivechatMessages.length)];

        const botUsername = botUsernamesList[Math.floor(Math.random() * botUsernamesList.length)];

        const bot = await userRepository.getUserByUsername(botUsername)

        if (!bot) {
            return
        }

        const newMessage = await botRepository.addMessage({ userId: bot.id, message });

        if (!newMessage) {
            return
        }

        const io = getSocketInstance();
        setTimeout(() => {
            io?.emit('chat:message', newMessage as IClientMessage);
            
        }, Math.floor(Math.random() * 10000) + 1000);


    }

}

export const botService = new BotService();