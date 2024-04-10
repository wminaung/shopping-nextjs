import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Rating } from "@prisma/client";

export interface RatingsState {
  items: Rating[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: RatingsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatings: (state, action: PayloadAction<Rating[]>) => {
      state.items = action.payload;
    },
    addRating: (state, action: PayloadAction<Rating>) => {
      state.items = [...state.items, action.payload];
    },
    testRating: (state) => {
      state.items = [{ count: 3, id: 3, productId: 3, rate: 3 } as Rating];
    },
  },
});

// Action creators are generated for each case reducer function

export const selectRatings = (state: RootState) => state.ratings.items;

export const ratingsAction = ratingsSlice.actions;

export default ratingsSlice.reducer;
