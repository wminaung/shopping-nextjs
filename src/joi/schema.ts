import { Prisma } from "@prisma/client";
import Joi from "joi";

export interface NewProduct {
  title: string;
  description: string;

  price: number;
}

const productCreateInput = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(80).required(),
  price: Joi.number().integer().min(0).required(),
  image: Joi.string().optional().allow(""),
});

const productUpdateInput = Joi.object<Prisma.productUpdateInput>({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(80).required(),
  price: Joi.number().integer().min(0).required(),
  image: Joi.string().optional(),
});

export const schema = {
  productCreateInput,
  productUpdateInput,
};
