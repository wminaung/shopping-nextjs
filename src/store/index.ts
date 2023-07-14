import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import adminSlice from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    products: productsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;