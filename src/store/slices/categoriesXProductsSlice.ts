/*
categoriesXProductsSlice
categoriesXProductsSlice
categoriesXProductsSlice
*/
import { CategoryXProduct } from "@/src/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { config } from "@/src/config/config";
import { adminAction } from "./adminSlice";

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

export const fetchCategoriesXProducts = createAsyncThunk(
  "categoriesXProducts/fetchCategoriesXProducts",
  async (arg: void, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(adminAction.setLoading(true));
    const response = await fetch(`${config.apiAdminUrl}/categoriesXProducts`);

    if (!response.ok) {
      return alert("something worng");
    }
    const responseData = (await response.json()) as CategoryXProduct[];

    dispatch(categoriesXProductsAction.setCategoriesXProducts(responseData));
    dispatch(adminAction.setLoading(false));
  }
);

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
    archiveCategoryXProduct: (
      state,
      action: PayloadAction<{ productId: number }>
    ) => {
      state.items = state.items.filter(
        (item) => !item.isArchive && item.productId !== action.payload.productId
      );
    },
  },
});

// Action creators are generated for each case reducer function

export const selectCategoriesXProducts = (state: RootState) =>
  state.categoriesXProducts.items;

export const categoriesXProductsAction = categoriesXProductsSlice.actions;

export default categoriesXProductsSlice.reducer;
