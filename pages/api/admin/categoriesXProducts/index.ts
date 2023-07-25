// todo categoriesXProducts get
import { prisma } from "@/src/db";
import { Category } from "@/src/types/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    try {
      const categoriesXProducts = await prisma.categoryxproduct.findMany({
        orderBy: {
          id: "asc",
        },
        where: {
          isArchive: false,
        },
      });
      return res.status(200).json(categoriesXProducts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
