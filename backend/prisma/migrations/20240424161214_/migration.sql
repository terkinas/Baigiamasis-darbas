/*
  Warnings:

  - A unique constraint covering the columns `[txHash]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `txHash` on table `Deposit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deposit" ALTER COLUMN "txHash" SET NOT NULL;

-- CreateTable
CREATE TABLE "DepositCheckCooldown" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepositCheckCooldown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_txHash_key" ON "Deposit"("txHash");
