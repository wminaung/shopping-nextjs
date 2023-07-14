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

export interface AdminState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AdminState = {
  isLoading: false,
  error: null,
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
    const { products } = responseData as Api.Admin.GET.ResponseData;

    dispatch(productsAction.setProducts(products));

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
  },
});

export const selectAdmin = (state: RootState) => state.admin;

// Action creators are generated for each case reducer function
export const adminAction = adminSlice.actions;
export default adminSlice.reducer;

export const adminData = createSelector(
  [selectAdmin, selectProducts],
  (admin, products) => {
    return {
      admin,
      products: products.items,
    };
  }
);

export const useAdminSlice = () => {
  const state = useSelector(adminData);
  const dispatch = useAppDispatch();
  const actions = adminAction;

  return {
    state,
    dispatch,
    actions: {
      ...actions,
      products: {
        ...productsAction,
      },
    },
  };
};
