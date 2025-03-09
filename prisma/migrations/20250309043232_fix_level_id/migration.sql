/*
  Warnings:

  - You are about to drop the column `level` on the `dimension_interpretations` table. All the data in the column will be lost.
  - Added the required column `level_id` to the `dimension_interpretations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dimension_interpretations" DROP CONSTRAINT "dimension_interpretations_level_fkey";

-- AlterTable
ALTER TABLE "dimension_interpretations" DROP COLUMN "level",
ADD COLUMN     "level_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "dimension_interpretations" ADD CONSTRAINT "dimension_interpretations_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "interpretation_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
