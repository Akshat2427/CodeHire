-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('MAANG', 'TRENDING', 'LATEST', 'STAFF_PICK', 'NONE');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" "CourseCategory" NOT NULL DEFAULT 'NONE';
