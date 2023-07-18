/*
  Warnings:

  - You are about to drop the `_ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductCategory" DROP CONSTRAINT "_ProductCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCategory" DROP CONSTRAINT "_ProductCategory_B_fkey";

-- DropTable
DROP TABLE "_ProductCategory";

-- CreateTable
CREATE TABLE "categoryxproduct" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoryxproduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoryxproduct" ADD CONSTRAINT "categoryxproduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryxproduct" ADD CONSTRAINT "categoryxproduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
