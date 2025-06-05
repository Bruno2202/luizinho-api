-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_purchaseId_fkey";

-- AlterTable
ALTER TABLE "movement" ALTER COLUMN "purchaseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
