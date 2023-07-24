import { Api, Product } from "@/src/types/types";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { productsAction, selectProducts } from "./productsSlice";
import { RootState } from "..";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { config } from "@/src/config/config";
import { categoriesAction, selectCategories } from "./categoriesSlice";
import {
  categoriesXProductsAction,
  selectCategoriesXProducts,
} from "./categoriesXProductsSlice";
import { ratingsAction, selectRatings } from "./ratingsSlice";
import { paginationAction, selectPagination } from "./paginationSlice";

export interface AdminState {
  isLoading: boolean;
  error: Error | null;
  navTitle: string;
  openDrawer: boolean;
}

const initialState: AdminState = {
  isLoading: false,
  error: null,
  navTitle: "",
  openDrawer: false,
};

export const fetchAdminData = createAsyncThunk(
  "admin/fetchAdminData",
  async (arg: void, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(adminAction.setLoading(true));
    const response = await fetch(`${config.apiAdminUrl}`);

    if (!response.ok) {
      return alert("something worng");
    }
    const responseData = await response.json();
    const { products, categories, categoriesXproducts } =
      responseData as Api.Admin.GET.ResponseData;

    dispatch(productsAction.setProducts(products));
    dispatch(categoriesAction.setCategories(categories));
    dispatch(
      categoriesXProductsAction.setCategoriesXProducts(categoriesXproducts)
    );
    dispatch(paginationAction.setDefaultPagination());

    //? loading end
    dispatch(adminAction.setLoading(false));
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNavTitle: (state, action: PayloadAction<string>) => {
      state.navTitle = action.payload;
    },
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin;

// Action creators are generated for each case reducer function
export const adminAction = adminSlice.actions;
export default adminSlice.reducer;

export const adminData = createSelector(
  [
    selectAdmin,
    selectProducts,
    selectCategories,
    selectCategoriesXProducts,
    selectRatings,
    selectPagination,
  ],
  (admin, products, categories, categoriesXProducts, ratings, pagination) => {
    return {
      admin,
      products,
      categories,
      categoriesXProducts,
      ratings,
      pagination,
    };
  }
);

export const useAdmin = () => {
  const state = useSelector(adminData);
  const dispatch = useAppDispatch();

  return {
    state,
    dispatch,
    actions: {
      ...adminAction,
      ...productsAction,
      ...categoriesAction,
      ...categoriesXProductsAction,
      ...ratingsAction,
      ...paginationAction,
    },
  };
};
