-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_cityId_fkey";

-- AlterTable
ALTER TABLE "client" ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;
