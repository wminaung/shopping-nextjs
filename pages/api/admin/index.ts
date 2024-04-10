// TODO api ----> /admin

import prisma from "@/src/db";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const orderByIdAsc:
  | Prisma.Enumerable<Prisma.productOrderByWithRelationInput>
  | undefined = {
  id: "asc",
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    try {
      const products = await prisma.product.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });
      const categories = await prisma.category.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });
      const categoriesXProducts = await prisma.categoryxproduct.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });
      const ratings = await prisma.rating.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });

      const users = await prisma.customer.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });

      const carts = await prisma.cart.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });

      const orders = await prisma.order.findMany({
        where: {
          isArchive: false,
        },
        orderBy: orderByIdAsc,
      });

      return res.status(200).json({
        products,
        categories,
        categoriesXProducts,
        ratings,
        users,
        carts,
        orders,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ message: "method not allow" });
}
