import { product, rating } from "@prisma/client";

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
