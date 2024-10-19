/*
  Warnings:

  - Added the required column `imageUrl` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Clothing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Clothing" ADD COLUMN     "imageUrl" TEXT NOT NULL;
