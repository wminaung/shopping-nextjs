import { prisma } from "@/src/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const categories = await prisma.product.findMany({
      select: { category: true },
    });

    return res
      .status(200)
      .json({ categories: categories.map((cat) => cat.category) });
  }
  res.status(200).json({ name: "John Doe" });
}
