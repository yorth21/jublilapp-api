/*
  Warnings:

  - You are about to drop the column `createdAt` on the `psychological_tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "psychological_tests" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "interpretation_levels" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,

    CONSTRAINT "interpretation_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dimension_interpretations" (
    "id" SERIAL NOT NULL,
    "dimension_id" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "dimension_interpretations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "overall_interpretations" (
    "id" SERIAL NOT NULL,
    "percentage" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "overall_interpretations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interpretation_levels_level_key" ON "interpretation_levels"("level");

-- AddForeignKey
ALTER TABLE "dimension_interpretations" ADD CONSTRAINT "dimension_interpretations_level_fkey" FOREIGN KEY ("level") REFERENCES "interpretation_levels"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dimension_interpretations" ADD CONSTRAINT "dimension_interpretations_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "psychological_dimensions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
