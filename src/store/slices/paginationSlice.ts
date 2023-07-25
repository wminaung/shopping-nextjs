import { Product, Rating } from "@/src/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Item {
  currentPage: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}
interface Pagination {
  products: Item;
  categories: Item;
}
interface CurrentPageItemsPerPage {
  currentPage: number;
  itemsPerPage: number;
}
export interface paginationState {
  item: Pagination;
  isLoading: boolean;
  error: null;
}

const initialState = {
  item: {
    products: {
      currentPage: 1,
      itemsPerPage: 10,
      startIndex: 0,
      endIndex: 10,
    },
    categories: {
      currentPage: 1,
      itemsPerPage: 8,
      startIndex: 0,
      endIndex: 8,
    },
  },
  isLoading: false,
  error: null,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<CurrentPageItemsPerPage>) => {
      const { currentPage, itemsPerPage } = action.payload;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      state.item = {
        ...state.item,
        products: {
          ...state.item.products,
          startIndex,
          endIndex,
          currentPage,
          itemsPerPage,
        },
        categories: {
          ...state.item.categories,
          startIndex,
          endIndex,
          currentPage,
          itemsPerPage,
        },
      };
    },
    setProductPaination: (
      state,
      action: PayloadAction<CurrentPageItemsPerPage>
    ) => {
      const { currentPage, itemsPerPage } = action.payload;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      state.item = {
        ...state.item,
        products: {
          ...state.item.products,
          currentPage,
          endIndex,
          itemsPerPage,
          startIndex,
        },
      };
    },
    setCategoryPaination: (
      state,
      action: PayloadAction<CurrentPageItemsPerPage>
    ) => {
      const { currentPage, itemsPerPage } = action.payload;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      state.item = {
        ...state.item,
        categories: {
          ...state.item.categories,
          currentPage,
          endIndex,
          itemsPerPage,
          startIndex,
        },
      };
    },
    setDefaultPagination: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function

export const selectPagination = (state: RootState) => state.pagination.item;

export const paginationAction = paginationSlice.actions;

export default paginationSlice.reducer;
