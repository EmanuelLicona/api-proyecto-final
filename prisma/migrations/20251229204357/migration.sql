/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JwtDenylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JwtDenylist" DROP CONSTRAINT "JwtDenylist_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT;

-- DropTable
DROP TABLE "Configuration";

-- DropTable
DROP TABLE "JwtDenylist";
