// import type { ValidationError as JoiValidationError } from "joi";

import {
  OrderLine,
  Category,
  Categoryxproduct,
  Order,
  Product,
  Rating,
} from "@prisma/client";
import { OrdersStateItem } from "../store/slices/ordersSlice";
export interface PaymentInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface OrderRequestPayload {
  orders: OrdersStateItem[];
  paymentInfo: PaymentInfo;
}
// export interface Product extends product {}

// export interface Category extends category {}

// export interface CategoryXProduct extends categoryxproduct {}

// export interface Rating extends rating {}
// export interface User extends customer {}
// export interface Cart extends cart {}
// export interface Order extends order {}

// export interface NewProduct {
//   title: string;
//   description: string;
//   category: string;
//   price: number;
// }

// export interface CatToShow extends Category {
//   isChecked: boolean;
// }

// export interface ValidationError extends JoiValidationError {}

// export namespace GET {
//   export namespace API {
//     export interface ResponseData {
//       products: Product[];
//       categories: Category[];
//       categoriesXproducts: CategoryXProduct[];
//       ratings: Rating[];
//     }
//   }
// }
export namespace Api {
  export namespace Admin {
    export namespace GET {
      export type ResponseData = {
        products: Product[];
        categories: Category[];
        categoriesXProducts: Categoryxproduct[];
        ratings: Rating[];
        // users: User[];
        carts: OrderLine[];
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

// export interface Orderline {
//   quantity: number;
//   totalPrice: number;
//   productId: number;
// }
