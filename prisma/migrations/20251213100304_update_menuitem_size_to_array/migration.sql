/*
  Warnings:

  - Changed the column `size` on the `MenuItem` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "size" SET DATA TYPE "MenuSize"[] USING ARRAY["size"];
