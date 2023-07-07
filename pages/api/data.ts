import { prisma } from "@/src/db";
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
      const categories = await prisma.product.findMany({
        select: { category: true },
      });
      return res
        .status(200)
        .json({ products, categories: categories.map((cat) => cat.category) });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  res.status(200).json({ name: "John Doe" });
}
