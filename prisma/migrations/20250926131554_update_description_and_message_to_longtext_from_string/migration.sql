-- AlterTable
ALTER TABLE `ContactMessage` MODIFY `message` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Inquiry` MODIFY `message` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `VisaService` MODIFY `description` LONGTEXT NOT NULL;
