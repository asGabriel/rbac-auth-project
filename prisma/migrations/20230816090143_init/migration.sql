/*
  Warnings:

  - Added the required column `ROLE` to the `USERS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `ROLE` VARCHAR(191) NOT NULL;
