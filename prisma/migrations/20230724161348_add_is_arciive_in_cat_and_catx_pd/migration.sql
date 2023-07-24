-- AlterTable
ALTER TABLE "category" ADD COLUMN     "isArchive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "categoryxproduct" ADD COLUMN     "isArchive" BOOLEAN NOT NULL DEFAULT false;
