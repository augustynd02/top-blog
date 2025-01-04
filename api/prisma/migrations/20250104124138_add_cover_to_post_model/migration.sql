/*
  Warnings:

  - Added the required column `cover_url` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "cover_url" TEXT NOT NULL;
