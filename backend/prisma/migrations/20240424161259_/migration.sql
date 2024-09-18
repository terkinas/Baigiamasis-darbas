-- DropIndex
DROP INDEX "Deposit_txHash_key";

-- AlterTable
ALTER TABLE "Deposit" ALTER COLUMN "txHash" DROP NOT NULL;
