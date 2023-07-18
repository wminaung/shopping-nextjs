import { prisma } from "@/src/db";
import { schema } from "@/src/joi/schema";
import { NewProduct, ValidationError } from "@/src/types/types";
import { deleteUndefinedfromObject } from "@/src/utils";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const payload = req.body as Prisma.productCreateInput;

    // if (!title || price < 1 || !category || !description) {
    //   return res.status(400).json({ message: "bad request" });
    // }

    try {
      const validNewProduct = await schema.productCreateInput.validateAsync({
        ...payload,
      });
      console.log("validNewProduct", validNewProduct);

      try {
        const newProduct = await prisma.product.create({
          data: validNewProduct,
        });
        return res.status(200).json({ product: newProduct });
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      const validationError = error as ValidationError;

      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
