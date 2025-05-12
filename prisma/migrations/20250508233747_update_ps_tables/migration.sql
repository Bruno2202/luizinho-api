/*
  Warnings:

  - You are about to drop the `sales_record` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expenseValue` on table `expense` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount` to the `expense_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExpenses` to the `expense_record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expense_record" DROP CONSTRAINT "expense_record_salesRecordId_fkey";

-- DropForeignKey
ALTER TABLE "sales_record" DROP CONSTRAINT "sales_record_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "sales_record" DROP CONSTRAINT "sales_record_carId_fkey";

-- DropForeignKey
ALTER TABLE "sales_record" DROP CONSTRAINT "sales_record_sellerId_fkey";

-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "expenseValue" SET NOT NULL;

-- AlterTable
ALTER TABLE "expense_record" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "totalExpenses" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "sales_record";

-- CreateTable
CREATE TABLE "movement" (
    "entryId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "movement_pkey" PRIMARY KEY ("entryId","saleId","carId")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3),
    "purchaseValue" DOUBLE PRECISION,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "costValue" DOUBLE PRECISION,
    "saleDate" TIMESTAMP(3),
    "observation" VARCHAR(255),
    "paymentCondition" TEXT,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_record" ADD CONSTRAINT "expense_record_salesRecordId_fkey" FOREIGN KEY ("salesRecordId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
