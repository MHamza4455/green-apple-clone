/*
  Warnings:

  - You are about to drop the column `highlights` on the `TourPackage` table. All the data in the column will be lost.
  - You are about to drop the column `itinerary` on the `TourPackage` table. All the data in the column will be lost.
  - Added the required column `notIncluded` to the `TourPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TourPackage` DROP COLUMN `highlights`,
    DROP COLUMN `itinerary`,
    ADD COLUMN `notIncluded` JSON NOT NULL;
