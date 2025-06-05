/*
  Warnings:

  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_entryId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_sellerId_fkey";

-- DropTable
DROP TABLE "purchases";

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3),
    "purchaseValue" DOUBLE PRECISION,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
