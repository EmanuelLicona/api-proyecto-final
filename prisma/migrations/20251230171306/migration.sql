/*
  Warnings:

  - You are about to drop the column `productId` on the `Operation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_productId_fkey";

-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "OperationProduct" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "interestRate" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "OperationProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallmentProduct" (
    "id" TEXT NOT NULL,
    "installmentId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "principal" DECIMAL(14,2) NOT NULL,
    "interest" DECIMAL(14,2) NOT NULL,

    CONSTRAINT "InstallmentProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OperationProduct" ADD CONSTRAINT "OperationProduct_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationProduct" ADD CONSTRAINT "OperationProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentProduct" ADD CONSTRAINT "InstallmentProduct_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "Installment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentProduct" ADD CONSTRAINT "InstallmentProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
