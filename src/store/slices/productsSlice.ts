import { Product } from "@/src/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

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
  },
});

// Action creators are generated for each case reducer function

export const selectProducts = (state: RootState) => state.products.items;

export const productsAction = productsSlice.actions;

export default productsSlice.reducer;
