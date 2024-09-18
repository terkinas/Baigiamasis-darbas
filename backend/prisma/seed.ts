import prisma from "../src/utils/prisma";
import { seedBots } from "./seeds/bots";
import { seedGames } from "./seeds/games";
import { seedRounds } from "./seeds/rounds";

async function main() {
    console.log('seed is running')

    await seedGames().catch(error => {
        console.error('Error seeding games:', error);
        process.exit(1);
    });

    // await seedRounds().catch(error => {
    //     console.error('Error seeding rounds:', error);
    //     process.exit(1);
    // })

    await seedBots().catch(error => {
        console.error('Error seeding bots:', error);
        process.exit(1);
    });
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
    