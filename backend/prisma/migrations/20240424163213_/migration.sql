/*
  Warnings:

  - The primary key for the `DepositCheckCooldown` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DepositCheckCooldown` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `DepositCheckCooldown` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DepositCheckCooldown" DROP CONSTRAINT "DepositCheckCooldown_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "DepositCheckCooldown_userId_key" ON "DepositCheckCooldown"("userId");
