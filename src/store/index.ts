import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import adminSlice from "./slices/adminSlice";
import categoriesSlice from "./slices/categoriesSlice";
import categoriesXProductsSlice from "./slices/categoriesXProductsSlice";
import ratingsSlice from "./slices/ratingsSlice";
import paginationSlice from "./slices/paginationSlice";
import shopperSlice from "./slices/shopperSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    products: productsSlice,
    categories: categoriesSlice,
    categoriesXProducts: categoriesXProductsSlice,
    ratings: ratingsSlice,
    pagination: paginationSlice,
    shopper: shopperSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
