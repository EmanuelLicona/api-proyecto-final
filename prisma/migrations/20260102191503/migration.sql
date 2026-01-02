/*
  Warnings:

  - You are about to drop the `InstallmentProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InstallmentProduct" DROP CONSTRAINT "InstallmentProduct_installmentId_fkey";

-- DropForeignKey
ALTER TABLE "InstallmentProduct" DROP CONSTRAINT "InstallmentProduct_productId_fkey";

-- DropTable
DROP TABLE "InstallmentProduct";
