/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CreditLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CreditLine_userId_key" ON "CreditLine"("userId");
