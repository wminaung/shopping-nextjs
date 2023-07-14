import { category, product, rating } from "@prisma/client";
import type { ValidationError as JoiValidationError } from "joi";

export interface Product extends product {
  rating: rating | null;
  categories: category[];
}

export interface Category extends category {
  products: product[];
}

export interface Rating extends rating {
  product: product;
}

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
      ratings: Rating[];
    }
  }
}
export namespace Api {
  export namespace Admin {
    export namespace GET {
      export type ResponseData = { products: Product[] };
    }
    export namespace Product {
      export namespace POST {
        export type ResponseData = { product: Product };
      }
    }
  }
}
