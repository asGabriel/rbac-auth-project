-- CreateTable
CREATE TABLE `USERS` (
    `CODUSER` VARCHAR(191) NOT NULL,
    `USERNAME` VARCHAR(191) NOT NULL,
    `EMAIL` VARCHAR(191) NOT NULL,
    `PASSWORD` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CODUSER`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
