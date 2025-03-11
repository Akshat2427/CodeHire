/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `u_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "u_id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("u_id");

-- CreateTable
CREATE TABLE "Course" (
    "c_id" TEXT NOT NULL,
    "c_name" TEXT NOT NULL,
    "c_desc" TEXT NOT NULL,
    "c_price" DOUBLE PRECISION NOT NULL,
    "c_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "round_name" TEXT NOT NULL,
    "estimated_score" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "r_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "r_previous_resume_shortlisted" TEXT[],
    "r_key_words" TEXT[],

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "Hackathon" (
    "h_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "h_platform" TEXT NOT NULL,
    "h_questions" TEXT[],

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("h_id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "i_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "total_interview_rounds" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "interviewer_id" TEXT,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("i_id")
);

-- CreateTable
CREATE TABLE "OnlineAssessment" (
    "oa_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "githubAPI" TEXT NOT NULL,

    CONSTRAINT "OnlineAssessment_pkey" PRIMARY KEY ("oa_id")
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "p_id" TEXT NOT NULL,
    "u_id" TEXT NOT NULL,
    "c_id" TEXT NOT NULL,
    "current_round" TEXT NOT NULL,
    "progress_percentage" DOUBLE PRECISION NOT NULL,
    "scores" INTEGER[],
    "mentor_assigned" TEXT,
    "interviewer_id" TEXT,

    CONSTRAINT "CourseProgress_pkey" PRIMARY KEY ("p_id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hackathon" ADD CONSTRAINT "Hackathon_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "User"("u_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineAssessment" ADD CONSTRAINT "OnlineAssessment_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "User"("u_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;
