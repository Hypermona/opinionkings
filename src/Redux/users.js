import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USERS } from "../data";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => USERS);

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: true },
  extraReducers: {
    [fetchUsers.loading]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
