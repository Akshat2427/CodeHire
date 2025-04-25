/*
  Warnings:

  - A unique constraint covering the columns `[u_id,c_id]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_u_id_c_id_key" ON "CourseProgress"("u_id", "c_id");
