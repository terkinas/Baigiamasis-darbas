import prisma from "../../src/utils/prisma"

export const gamesToSeed = [
    {
        "name": "roulette",
    }
]

export async function seedGames() {
    const existingGames = await prisma.game.findMany({
        where: {
            OR: gamesToSeed.map(game => ({ name: game.name }))
        }
    });

    const existingGameNames = new Set(existingGames.map(game => game.name));

    const gamesToCreate = gamesToSeed.filter(game => !existingGameNames.has(game.name));

    if (gamesToCreate.length === 0) {
        console.log('No new games to create.');
        return;
    }

    await prisma.game.createMany({
        data: gamesToCreate,
    });

    return
}