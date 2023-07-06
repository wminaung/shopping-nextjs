import { product, rating } from "@prisma/client";
import type { ValidationError as JoiValidationError } from "joi";

export interface Product extends product {
  rating: rating | null;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface CategoryCheck {
  category: string;
  isCheck: boolean;
}

export interface CartItem {
  id: number;
  quantity: number;
}
export interface OrderItem extends Product {
  quantity: number;
}

export interface NewProduct {
  title: string;
  description: string;
  category: string;
  price: number;
}

export interface ValidationError extends JoiValidationError {}
