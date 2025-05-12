/*
  Warnings:

  - The primary key for the `movement` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_saleId_fkey";

-- AlterTable
ALTER TABLE "movement" DROP CONSTRAINT "movement_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "saleId" DROP NOT NULL,
ADD CONSTRAINT "movement_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
