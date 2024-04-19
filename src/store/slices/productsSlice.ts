import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "@prisma/client";

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const items = state.items;
      const updatedCategories = items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      state.items = updatedCategories;
    },
    archiveProduct: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function

export const selectProducts = (state: RootState) => state.products.items;

export const productsAction = productsSlice.actions;

export default productsSlice.reducer;
