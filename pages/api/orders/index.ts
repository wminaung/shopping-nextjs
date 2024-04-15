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
    console.log(payload);

    // if customer not exist create cus

    let customer = await prisma.customer.findUnique({
      where: {
        email: paymentInfo.email,
      },
    });

    if (!customer) {
      const newCustomer = await prisma.customer.create({
        data: {
          email: paymentInfo.email,
          name: paymentInfo.name,
          address: paymentInfo.address,
          phone: paymentInfo.phone,
        },
      });

      customer = newCustomer;
    }
    if (!customer || !customer.id) return new Error("there is no customer");
    // add orderline to api cart

    const carts = await prisma.$transaction(
      orders.map((order) => {
        return prisma.cart.create({
          data: {
            productId: Number(order.product.id),
            quantity: Number(order.quantity),
          },
        });
      })
    );

    carts.forEach(async (cart) => {
      const neworder = await prisma.order.create({
        data: {
          totalPrice: 1000,
          cartId: cart.id,
        },
      });
      await prisma.customerOrder.create({
        data: {
          orderId: neworder.id,
          customerId: customer?.id,
        },
      });
    });

    // add order  to api order

    const responseData = await prisma.order.findMany();

    // const some = await prisma.customer.create();

    return res.status(200).json(responseData);
  }
  res.status(200).json({ name: "John Doe" });
}
