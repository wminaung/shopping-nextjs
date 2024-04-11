import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "@prisma/client";

interface OrdersStateItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface OrdersState {
  items: OrdersStateItem[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: OrdersState = {
  items: [],
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrdersStateItem[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrdersStateItem>) => {
      state.items = [...state.items, action.payload];
    },
    updateOrder: (state, action: PayloadAction<OrdersStateItem>) => {
      const items = state.items;
      const OrdersStateItems = items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      state.items = OrdersStateItems;
    },
    deleteOrder: (state, action: PayloadAction<OrdersStateItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// ! For Backend
export const selectOrder = (state: RootState) => state.orders;

export const orderAction = ordersSlice.actions;

export default ordersSlice.reducer;
