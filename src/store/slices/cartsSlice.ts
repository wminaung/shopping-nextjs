import { Cart, Product, Rating } from "@/src/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface cartState {
  items: Cart[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: cartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcart: (state, action: PayloadAction<Cart[]>) => {
      state.items = action.payload;
    },
    addCart: (state, action: PayloadAction<Cart>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

// ! For Backend

// export const selectcart = (state: RootState) => state.cart.items;

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
