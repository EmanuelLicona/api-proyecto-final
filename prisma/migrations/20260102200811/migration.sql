/*
  Warnings:

  - You are about to alter the column `creditLimit` on the `CreditLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `interestRate` on the `CreditLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `amount` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `principal` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `interest` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `lateInterest` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `amount` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `interestRate` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `lateRate` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `amount` on the `OperationProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `interestRate` on the `OperationProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Decimal(14,4)`.
  - You are about to alter the column `baseRate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "CreditLine" ALTER COLUMN "creditLimit" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "interestRate" SET DATA TYPE DECIMAL(5,4);

-- AlterTable
ALTER TABLE "Installment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "principal" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "interest" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "lateInterest" SET DATA TYPE DECIMAL(14,4);

-- AlterTable
ALTER TABLE "Operation" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "interestRate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "lateRate" SET DATA TYPE DECIMAL(5,4);

-- AlterTable
ALTER TABLE "OperationProduct" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "interestRate" SET DATA TYPE DECIMAL(5,4);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,4);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(14,4),
ALTER COLUMN "baseRate" SET DATA TYPE DECIMAL(5,4);
