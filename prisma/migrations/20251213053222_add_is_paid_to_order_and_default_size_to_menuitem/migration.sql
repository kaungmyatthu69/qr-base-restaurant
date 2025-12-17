/*
  Warnings:

  - You are about to drop the column `is_paid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `is_parcel` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Table` table. All the data in the column will be lost.
  - Added the required column `isPaid` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MenuSize" AS ENUM ('S', 'M', 'L');

-- DropIndex
DROP INDEX "Table_number_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "is_paid",
DROP COLUMN "is_parcel",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL,
ADD COLUMN     "isParcel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "number";

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "isStock" BOOLEAN NOT NULL DEFAULT true,
    "size" "MenuSize" NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);
