/*
  Warnings:

  - You are about to drop the column `ratingId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_ratingId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "ratingId";

-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rating_product_id_key" ON "rating"("product_id");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
