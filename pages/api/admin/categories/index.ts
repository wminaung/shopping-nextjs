import prisma from "@/src/db";
import { schema } from "@/src/joi/schema";
import { ValidationError } from "@/src/types/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const payload = req.body as Prisma.categoryCreateInput;

    if (!payload.name) {
      return res.status(400).json("Bad request");
    }

    try {
      try {
        const newCategory = await prisma.category.create({
          data: payload,
        });
        return res.status(200).json(newCategory);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      const validationError = error as ValidationError;

      return res.status(500).json(error);
    }
  }
  if (method === "GET") {
    try {
      try {
        const categories = await prisma.category.findMany({
          where: {
            isArchive: false,
          },
          orderBy: {
            id: "asc",
          },
        });
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      const validationError = error as ValidationError;

      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
