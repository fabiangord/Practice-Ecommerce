/*
  Warnings:

  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `total`;

-- AlterTable
ALTER TABLE `Order_Product` ADD COLUMN `total` INTEGER NOT NULL DEFAULT 0;
