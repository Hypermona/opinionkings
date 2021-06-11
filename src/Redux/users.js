import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USERS } from "../data";
import { useQuery } from "urql";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => USERS);
export const login = createAsyncThunk("users/login", async (args) => {
  const [result, reexecuteQuery] = useQuery({
    query: `
  query($userName:String,$email:String,$password:String){
    login(userName:$userName,email:$email,password:$password){
      id
      token
    }
  }`,
    variables: args,
  });
  return result;
});

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
    [login.loading]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.users.push(action.payload.data);
      state.loading = false;
    },
    // [login.rejected]: (state, action) => {
    //   action.payload.error && state.users.push(action.payload);
    //   state.loading = false;
    // },
  },
});

export default usersSlice.reducer;
