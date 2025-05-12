/*
  Warnings:

  - The primary key for the `movement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entryId` on the `movement` table. All the data in the column will be lost.
  - Added the required column `purchaseId` to the `movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_entryId_fkey";

-- AlterTable
ALTER TABLE "movement" DROP CONSTRAINT "movement_pkey",
DROP COLUMN "entryId",
ADD COLUMN     "purchaseId" INTEGER NOT NULL,
ADD CONSTRAINT "movement_pkey" PRIMARY KEY ("purchaseId", "saleId", "carId");

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
