import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface OrderlinesState {
  items: [];
  isLoading: boolean;
  error: Error | null;
}

const initialState: OrderlinesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
    },
    addOrderlines: (state, action: PayloadAction<{}>) => {},
  },
});

// ! For Backend
export const selectOrderlines = (state: RootState) => state.orderlines;

export const orderlinesAction = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
