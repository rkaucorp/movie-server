/*
  Warnings:

  - You are about to drop the column `authorId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Movie` DROP FOREIGN KEY `Movie_authorId_fkey`;

-- AlterTable
ALTER TABLE `Movie` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `title` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
