/*
  Warnings:

  - The `birthDate` column on the `client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `registrationDate` column on the `client` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3),
DROP COLUMN "registrationDate",
ADD COLUMN     "registrationDate" TIMESTAMP(3);
