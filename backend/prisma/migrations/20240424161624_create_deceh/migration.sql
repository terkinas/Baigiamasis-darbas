/*
  Warnings:

  - You are about to drop the column `walletId` on the `DepositCheckCooldown` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DepositCheckCooldown" DROP COLUMN "walletId";
