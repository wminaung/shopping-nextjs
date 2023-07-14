-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "total_price" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
