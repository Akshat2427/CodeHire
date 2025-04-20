/*
  Warnings:

  - Added the required column `logo` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageCount` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "stageCount" INTEGER NOT NULL;
