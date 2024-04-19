import prisma from "@/src/db";
import { schema } from "@/src/joi/schema";
import { Method } from "@/src/types/types";
import { deleteUndefinedfromObject } from "@/src/utils";
import { Category, Order, OrderLine, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type OrderWithOrderlines = Order & {
  orderlines: (OrderLine & {
    product: { title: string };
  })[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as Method;
  if (method === "GET") {
    const ordersWithOrderLines = await prisma.order.findMany({
      orderBy: { id: "asc" },
      include: {
        orderlines: {
          orderBy: { id: "asc" },
          include: {
            product: { select: { title: true } },
          },
        },
      },
    });

    return res.status(200).json(ordersWithOrderLines);
  } else if (method === "POST") {
    res.status(200).json({ name: "John Doe" });
  }
}
