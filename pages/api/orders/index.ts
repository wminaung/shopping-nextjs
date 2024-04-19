import prisma from "@/src/db";
import { OrderRequestPayload } from "@/src/types/types";
import { Customer, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const payload = req.body as OrderRequestPayload;
    const { orders, paymentInfo } = payload;

    const totalPrice = orders.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    const newOrder = await prisma.order.create({
      data: {
        status: "PENDING",
        totalPrice: totalPrice + 0.0,
      },
    });
    const newOrderId = newOrder.id;

    const newOrderLinesData = orders.map((order) => {
      return {
        productId: order.product.id,
        orderId: newOrderId,
        quantity: order.quantity,
      };
    });

    const newOrderlines = await prisma.orderLine.createMany({
      data: newOrderLinesData,
    });

    const { email, name, address, phone } = paymentInfo;

    let customer = await prisma.customer.findUnique({
      where: { email: email },
    });

    if (!customer || !customer.id) {
      customer = await prisma.customer.create({
        data: { email, name, address, phone },
      });
    }
    const customerOrder = await prisma.customerOrder.create({
      data: { orderId: newOrderId, customerId: customer.id },
    });
    const responseData = await prisma.order.findMany();

    return res.status(200).json({ customerOrder, responseData, newOrderlines });
  }
  res.status(200).json({ name: "John Doe" });
}
