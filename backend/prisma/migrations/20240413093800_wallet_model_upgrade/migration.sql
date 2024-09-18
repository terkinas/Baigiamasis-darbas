/*
  Warnings:

  - You are about to drop the column `privateKeyEncrypted` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `privateKey` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "privateKeyEncrypted",
ADD COLUMN     "privateKey" TEXT NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "totalReceived" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
