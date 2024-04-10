// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/src/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  }
}
