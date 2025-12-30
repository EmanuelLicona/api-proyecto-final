/*
  Warnings:

  - The primary key for the `InstallmentProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InstallmentProduct` table. All the data in the column will be lost.
  - The primary key for the `OperationProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OperationProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InstallmentProduct" DROP CONSTRAINT "InstallmentProduct_installmentId_fkey";

-- DropForeignKey
ALTER TABLE "InstallmentProduct" DROP CONSTRAINT "InstallmentProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "OperationProduct" DROP CONSTRAINT "OperationProduct_operationId_fkey";

-- DropForeignKey
ALTER TABLE "OperationProduct" DROP CONSTRAINT "OperationProduct_productId_fkey";

-- AlterTable
ALTER TABLE "InstallmentProduct" DROP CONSTRAINT "InstallmentProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "InstallmentProduct_pkey" PRIMARY KEY ("installmentId", "productId");

-- AlterTable
ALTER TABLE "OperationProduct" DROP CONSTRAINT "OperationProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OperationProduct_pkey" PRIMARY KEY ("operationId", "productId");

-- AddForeignKey
ALTER TABLE "OperationProduct" ADD CONSTRAINT "OperationProduct_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationProduct" ADD CONSTRAINT "OperationProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentProduct" ADD CONSTRAINT "InstallmentProduct_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "Installment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentProduct" ADD CONSTRAINT "InstallmentProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
