import { OrderRequestPayload } from "@/src/types/types";
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
  }
  res.status(200).json({ name: "John Doe" });
}
