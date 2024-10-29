import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { botList, namesBlacklist } from "../../src/config/bots"
import { userRepository } from "../../src/database/repository/userRepository"
import { IServerUser } from "../../src/types/server/user.interface"
import prisma from "../../src/utils/prisma"
import { IClientUser } from "../../src/types/client/user.interface"
import { botRepository, BotRepository } from "../../src/database/repository/botRepository"
import bcrypt from 'bcrypt';

export async function seedBots() {

    const existingBots = await prisma.user.findMany({
        where: {
            username: {
                in: botList
            }
        }
    })

    if (existingBots.length < 1) {
        console.log('No bots found, seeding bots.')
    }

    const existingBotNames = existingBots.map(bot => bot.username)
    const botsToSeed = botList.filter(bot => !existingBotNames.includes(bot))


    // const deleteResult = await prisma.user.deleteMany({
    //     where: {
    //         username: {
    //             in: botList
    //         }
    //     }
    // });

    namesBlacklist.forEach(async (username: string) => {
        botRepository.createBot({ username, password: 'blacklisted'})
    })

    botsToSeed.forEach(async (username) => {
        const hashedPassword = await bcrypt.hash('Verslas123456789', 10);
        botRepository.createBot({ username, password: hashedPassword})
    })
}

