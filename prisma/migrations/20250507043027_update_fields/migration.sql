/*
  Warnings:

  - A unique constraint covering the columns `[plate]` on the table `car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renavam]` on the table `car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chassis]` on the table `car` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plate` on table `car` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_colorId_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_fuelId_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_transmissionId_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_typeId_fkey";

-- AlterTable
ALTER TABLE "car" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "plate" SET NOT NULL,
ALTER COLUMN "plate" SET DATA TYPE TEXT,
ALTER COLUMN "typeId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "transmissionId" DROP NOT NULL,
ALTER COLUMN "fuelId" DROP NOT NULL,
ALTER COLUMN "colorId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "car_plate_key" ON "car"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "car_renavam_key" ON "car"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "car_chassis_key" ON "car"("chassis");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_fuelId_fkey" FOREIGN KEY ("fuelId") REFERENCES "fuel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "transmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
