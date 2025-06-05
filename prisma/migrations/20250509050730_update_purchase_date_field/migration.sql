/*
  Warnings:

  - You are about to drop the column `puchaseDate` on the `purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "puchaseDate",
ADD COLUMN     "purchaseDate" TIMESTAMP(3);
