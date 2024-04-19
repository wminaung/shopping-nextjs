import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Category } from "@prisma/client";

type Catshow = Category & { isChecked: boolean };

export interface CatshowSlice {
  items: Catshow[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CatshowSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const catshowSlice = createSlice({
  name: "catshow",
  initialState,
  reducers: {
    setCatshow: (state, action: PayloadAction<Catshow[]>) => {
      state.items = action.payload;
    },
    addSetshow: (state, action: PayloadAction<Catshow>) => {
      state.items = [...state.items, action.payload];
    },
    IsCheckedCatshow: (state, action: PayloadAction<Catshow>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function

export const selectCatshow = (state: RootState) => state.catshow;

export const catshowActions = catshowSlice.actions;

export default catshowSlice.reducer;
