// TODO api ----> /admin

import { prisma } from "@/src/db";
import { Product, Rating } from "@/src/types/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    try {
      const products = await prisma.product.findMany({
        include: {
          carts: true,
          categories: true,
          rating: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ message: "method not allow" });
}
