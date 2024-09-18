import prisma from "../../src/utils/prisma"

export const roundsToSeed = [
    {
        id: 10000,
        isOpen: true,
        gameName: "roulette"
    }
]

export const seedRounds = async () => {
    const games = await prisma.game.findMany({
        where: {
            OR: roundsToSeed.map(round => ({ name: round.gameName }))
        }
    })

    // const roundsToCreate = roundsToSeed.filter(round => !games.some(game => game.name === round.gameName))

    const roundsToCreate = roundsToSeed.map(round => ({
        id: round.id,
        isOpen: round.isOpen,
        gameId: games.find(game => game.name === round.gameName)?.id || 0 // Default value if gameId is undefined
    }));

    if (roundsToCreate.length === 0) {
        console.log('No new rounds to create.');
        return;
    }

    await prisma.round.createMany({
        data: roundsToCreate,
    });
}