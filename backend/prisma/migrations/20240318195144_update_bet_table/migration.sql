/*
  Warnings:

  - You are about to drop the column `settled` on the `Bet` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "settled",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "isSettled" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
