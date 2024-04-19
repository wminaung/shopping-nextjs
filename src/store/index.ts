import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import adminReducer from "./slices/adminSlice";
import categoriesReducer from "./slices/categoriesSlice";
import categoriesXProductsReducer from "./slices/categoriesXProductsSlice";
import ratingsReducer from "./slices/ratingsSlice";
import paginationReducer from "./slices/paginationSlice";
import shopperReducer from "./slices/shopperSlice";
import catShowReducer from "./slices/catshowSlice";
import orderlinesReducer from "./slices/orderlinesSlice";
import ordersReducer from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    products: productsReducer,
    categories: categoriesReducer,
    categoriesXProducts: categoriesXProductsReducer,
    ratings: ratingsReducer,
    pagination: paginationReducer,
    shopper: shopperReducer,
    catshow: catShowReducer,
    orderlines: orderlinesReducer,
    orders: ordersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
