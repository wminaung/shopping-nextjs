import { prisma } from "@/src/db";
import { schema } from "@/src/joi/schema";
import { ValidationError } from "@/src/types/types";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const categoryIdStr = req.query.id as string;
  const categoryId = Number(categoryIdStr);

  if (method === "PUT") {
    const payload = req.body as Prisma.categoryUpdateInput;

    if (!payload.name) {
      return res.status(400).json("Bad request");
    }

    try {
      try {
        const updatedCategory = await prisma.category.update({
          data: payload,
          where: {
            id: categoryId,
          },
        });
        return res.status(200).json(updatedCategory);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      try {
        const deletedCategory = await prisma.category.delete({
          where: {
            id: categoryId,
          },
        });
        return res.status(200).json(deletedCategory);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json({ name: "John Doe" });
}
