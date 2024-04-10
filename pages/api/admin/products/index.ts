import prisma from "@/src/db";
import { schema } from "@/src/joi/schema";
import { deleteUndefinedfromObject } from "@/src/utils";
import { Category, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const payload = req.body as Prisma.ProductCreateInput;
    const selectedCategories = req.body.selectedCategories as Category[];

    const isValid =
      payload.title &&
      payload.price >= 0 &&
      payload.description &&
      payload.image &&
      selectedCategories.length > 0;

    if (!isValid) {
      return res.status(400).json("invalid input");
    }

    const createCategoriesByProduct: Prisma.CategoryxproductCreateManyProductsInput[] =
      selectedCategories.map((category) => ({ categoryId: category.id }));

    try {
      const { title, price, description, image } = payload;
      const validNewProduct = { title, price, description, image };
      const newProduct = await prisma.product.create({
        data: {
          ...validNewProduct,
          categoryxproduct: {
            createMany: {
              data: createCategoriesByProduct,
            },
          },
        },
      });
      if (!newProduct || !newProduct.id) {
        throw new Error("product create fail");
      }
      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
