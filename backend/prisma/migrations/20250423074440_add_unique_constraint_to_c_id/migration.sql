/*
  Warnings:

  - A unique constraint covering the columns `[c_id]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resume_c_id_key" ON "Resume"("c_id");
