/*
  Warnings:

  - You are about to drop the column `imagePulicId` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "imagePulicId",
ADD COLUMN     "imagePublicId" TEXT;
