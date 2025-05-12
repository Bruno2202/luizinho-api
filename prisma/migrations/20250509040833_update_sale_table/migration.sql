/*
  Warnings:

  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expense_record" DROP CONSTRAINT "expense_record_salesRecordId_fkey";

-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_saleId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_buyerId_fkey";

-- DropTable
DROP TABLE "sales";

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "costValue" DOUBLE PRECISION,
    "saleDate" TIMESTAMP(3),
    "observation" VARCHAR(255),
    "paymentCondition" TEXT,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_record" ADD CONSTRAINT "expense_record_salesRecordId_fkey" FOREIGN KEY ("salesRecordId") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
