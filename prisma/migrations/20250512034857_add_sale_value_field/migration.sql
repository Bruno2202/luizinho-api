/*
  Warnings:

  - Added the required column `saleValue` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "saleValue" DOUBLE PRECISION NOT NULL;
