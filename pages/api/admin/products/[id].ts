import { prisma } from "@/src/db";
import { schema } from "@/src/joi/schema";
import { ValidationError } from "@/src/types/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const idStr = req.query.id as string;
  const productId = Number(idStr);

  if (method === "PUT") {
    const payload = req.body as Prisma.productUpdateInput;

    if (
      !payload.title ||
      !payload.description ||
      typeof payload.price !== "number" ||
      payload.price < 0
    ) {
      return res.status(400).json("Bad request");
    }

    try {
      try {
        const updatedProduct = await prisma.product.update({
          data: payload,
          where: {
            id: productId,
          },
        });
        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      try {
        const deletedProduct = await prisma.product.delete({
          where: {
            id: productId,
          },
        });
        return res.status(200).json(deletedProduct);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
