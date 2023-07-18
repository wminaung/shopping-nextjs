/*
categoriesXProductsSlice
categoriesXProductsSlice
categoriesXProductsSlice
*/
import { CategoryXProduct } from "@/src/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CategoriesXProductsState {
  items: CategoryXProduct[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CategoriesXProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const categoriesXProductsSlice = createSlice({
  name: "categoriesXProducts",
  initialState,
  reducers: {
    setCategoriesXProducts: (
      state,
      action: PayloadAction<CategoryXProduct[]>
    ) => {
      state.items = action.payload;
    },
    addCategoryXProduct: (state, action: PayloadAction<CategoryXProduct>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function

export const selectCategoriesXProducts = (state: RootState) =>
  state.categoriesXProducts.items;

export const categoriesXProductsAction = categoriesXProductsSlice.actions;

export default categoriesXProductsSlice.reducer;
