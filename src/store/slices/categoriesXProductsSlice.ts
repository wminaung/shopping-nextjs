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

export const fetchAdminData = createAsyncThunk(
  "categoriesXProducts/fetchCategoriesXProducts",
  async (arg: void, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    const response = await fetch(`${config.apiAdminUrl}/categoriesXProducts`);

    if (!response.ok) {
      return alert("something worng");
    }
    const responseData = (await response.json()) as CategoryXProduct[];

    // dispatch(categoriesAction.setCategories(responseData));
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
    deleteCategoriesXProducts: (state) => {
      state.items = state.items.filter((item) => !item.isArchive);
    },
  },
});

// Action creators are generated for each case reducer function

export const selectCategoriesXProducts = (state: RootState) =>
  state.categoriesXProducts.items;

export const categoriesXProductsAction = categoriesXProductsSlice.actions;

export default categoriesXProductsSlice.reducer;
