import {
  cart,
  category,
  categoryxproduct,
  customer,
  order,
  product,
  rating,
} from "@prisma/client";
import type { ValidationError as JoiValidationError } from "joi";

export interface Product extends product {}

export interface Category extends category {}

export interface CategoryXProduct extends categoryxproduct {}

export interface Rating extends rating {}
export interface User extends customer {}
export interface Cart extends cart {}
export interface Order extends order {}

export interface NewProduct {
  title: string;
  description: string;
  category: string;
  price: number;
}

export interface CatToShow extends Category {
  isChecked: boolean;
}

export interface ValidationError extends JoiValidationError {}

export namespace GET {
  export namespace API {
    export interface ResponseData {
      products: Product[];
      categories: Category[];
      categoriesXproducts: CategoryXProduct[];
      ratings: Rating[];
    }
  }
}
export namespace Api {
  export namespace Admin {
    export namespace GET {
      export type ResponseData = {
        products: Product[];
        categories: Category[];
        categoriesXProducts: CategoryXProduct[];
        ratings: Rating[];
        users: User[];
        carts: Cart[];
        orders: Order[];
      };
    }
    export namespace Product {
      export namespace POST {
        export type ResponseData = { product: Product };
      }
    }
  }
}

export interface Orderline {
  quantity: number;
  totalPrice: number;
  productId: number;
}
