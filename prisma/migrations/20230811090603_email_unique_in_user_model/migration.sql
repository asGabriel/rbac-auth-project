/*
  Warnings:

  - A unique constraint covering the columns `[EMAIL]` on the table `USERS` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UPDATEDAT` to the `USERS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `CREATEDAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `OLDPASSWORD` VARCHAR(191) NULL,
    ADD COLUMN `UPDATEDAT` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `USERS_EMAIL_key` ON `USERS`(`EMAIL`);
