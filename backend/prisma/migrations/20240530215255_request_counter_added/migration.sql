-- CreateTable
CREATE TABLE "RequestCounter" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestCounter_pkey" PRIMARY KEY ("id")
);
