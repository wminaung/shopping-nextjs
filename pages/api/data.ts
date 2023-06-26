import { prisma } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === `GET`) {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          rating: true,
        },
      });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  res.status(200).json({ name: "John Doe" });
}
