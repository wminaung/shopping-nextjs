import { prisma } from "@/src/db";
import { GET } from "@/src/types/types";
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
      });
      const categories = await prisma.category.findMany({
        orderBy: {
          id: "asc",
        },
      });

      const ratings = await prisma.rating.findMany({
        orderBy: { id: "asc" },
      });

      const categoriesXProducts = await prisma.categoryxproduct.findMany({
        orderBy: {
          id: "asc",
        },
      });

      // const responseData: GET.API.ResponseData = {
      //   products,
      //   categories,
      //   ratings,
      //   categoriesXproducts,
      // };

      const responseData = {
        products,
        categories,
        categoriesXProducts,
      };
      return res.status(200).json(responseData);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  res.status(200).json({ name: "John Doe" });
}
