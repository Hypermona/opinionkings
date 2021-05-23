import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POSTS } from "../data";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => POSTS);

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
  },
});

export default postsSlice.reducer;
