-- AlterTable
ALTER TABLE "store" ADD COLUMN     "cityId" INTEGER;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;
