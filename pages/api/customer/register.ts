import prisma from "@/src/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const payload = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const { name, email, password } = payload;

    const isCustomerExist = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });
    if (isCustomerExist) {
      return res.status(400).json({ message: "customer email already exist" });
    }
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(200).json(newCustomer);
  }
  res.status(200).json({ name: "register Doe" });
}
