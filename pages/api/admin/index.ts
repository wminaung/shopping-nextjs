// TODO api ----> /admin

import { prisma } from "@/src/db";
import { Product, Rating } from "@/src/types/types";
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
        orderBy: orderByIdAsc,
      });
      const categories = await prisma.category.findMany({
        orderBy: orderByIdAsc,
      });
      const categoriesXproducts = await prisma.categoryxproduct.findMany({
        orderBy: orderByIdAsc,
      });
      const ratings = await prisma.rating.findMany({
        orderBy: orderByIdAsc,
      });

      const users = await prisma.user.findMany({
        orderBy: orderByIdAsc,
      });

      const carts = await prisma.cart.findMany({
        orderBy: orderByIdAsc,
      });

      const orders = await prisma.order.findMany({
        orderBy: orderByIdAsc,
      });

      return res.status(200).json({
        products,
        categories,
        categoriesXproducts,
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
