import { Api } from "@/src/types/types";
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
import { catshowActions, selectCatshow } from "./catshowSlice";
import { orderAction, selectOrder } from "./ordersSlice";
import { Product } from "@prisma/client";

export interface ShopperState {
  isLoading: boolean;
  error: Error | null;
  navTitle: string;
  openDrawer: boolean;
  productsToShow: Product[];
}

const initialState: ShopperState = {
  isLoading: false,
  error: null,
  navTitle: "",
  openDrawer: false,
  productsToShow: [],
};

export const fetchShopperData = createAsyncThunk(
  "shopper/fetchShopperData",
  async (arg: void, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(shopperAction.setLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/data`);

    if (!response.ok) {
      return alert("something worng");
    }
    const responseData = await response.json();
    const { products, categories, categoriesXProducts } =
      responseData as Api.Admin.GET.ResponseData;

    dispatch(productsAction.setProducts(products));
    dispatch(categoriesAction.setCategories(categories));

    dispatch(
      categoriesXProductsAction.setCategoriesXProducts(categoriesXProducts)
    );
    dispatch(paginationAction.setDefaultPagination());

    //? loading end
    dispatch(shopperAction.setLoading(false));
  }
);

export const shopperSlice = createSlice({
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
    setProductsToShow: (state, action: PayloadAction<Product[]>) => {
      state.showProducts = action.payload;
    },
  },
});

export const selectShopper = (state: RootState) => state.shopper;

// Action creators are generated for each case reducer function
export const shopperAction = shopperSlice.actions;
export default shopperSlice.reducer;

export const shopperData = createSelector(
  [
    selectShopper,
    selectProducts,
    selectCategories,
    selectCategoriesXProducts,
    selectRatings,
    selectPagination,
    selectCatshow,
    selectOrder,
  ],
  (
    shopper,
    products,
    categories,
    categoriesXProducts,
    ratings,
    pagination,
    catshow,
    orders
  ) => {
    return {
      shopper,
      products,
      categories,
      categoriesXProducts,
      ratings,
      pagination,
      catshow,
      orders,
    };
  }
);

export const useShopper = () => {
  const state = useSelector(shopperData);
  const dispatch = useAppDispatch();

  return {
    state,
    dispatch,
    actions: {
      ...shopperAction,
      ...productsAction,
      ...categoriesAction,
      ...categoriesXProductsAction,
      ...ratingsAction,
      ...paginationAction,
      ...catshowActions,
      ...orderAction,
    },
  };
};
