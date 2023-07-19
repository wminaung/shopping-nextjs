import { Category, Product } from "@/src/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: CategoriesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items = [...state.items, action.payload];
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const items = state.items;
      const updatedCategories = items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      state.items = updatedCategories;
    },
    deleteCategory: (state, action: PayloadAction<Category>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function

export const selectCategories = (state: RootState) => state.categories.items;

export const categoriesAction = categoriesSlice.actions;

export default categoriesSlice.reducer;
