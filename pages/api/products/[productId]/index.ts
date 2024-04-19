import prisma from "@/src/db";
import { schema } from "@/src/joi/schema";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const productIdStr = req.query.id as string;
  const productId = Number(productIdStr);

  if (method === "GET") {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return res.status(200).json(product);
  }

  res.status(200).json({ name: "John Doe" });
}
