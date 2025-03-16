/*
  Warnings:

  - You are about to drop the `OnlineAssessment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'GITHUB');

-- DropForeignKey
ALTER TABLE "OnlineAssessment" DROP CONSTRAINT "OnlineAssessment_c_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'EMAIL';

-- DropTable
DROP TABLE "OnlineAssessment";
