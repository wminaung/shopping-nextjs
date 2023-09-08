// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/src/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    // const order = await prisma.cart.create({});

    return res.status(200).json({ name: "Order api POST" });
  }

  res.status(200).json({ name: "Order api" });
}
