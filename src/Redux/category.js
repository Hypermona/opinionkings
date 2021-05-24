import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORY } from "../data";

export const fetchCategory = createAsyncThunk("category/fetchCategory", async () => CATEGORY);

const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [], loading: true },
  extraReducers: {
    [fetchCategory.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
  },
});

export default categorySlice.reducer;
