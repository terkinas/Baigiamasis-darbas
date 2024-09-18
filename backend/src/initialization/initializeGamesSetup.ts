import { clearPreviousRounds } from "./initializeRouletteRounds";

export default async function initializeGamesSetup() {
    try {
        await clearPreviousRounds();
        // await initializeRouletteRounds();
    } catch (error) {
        console.error('Error initializing setup:', error);
        throw error;
    }
}