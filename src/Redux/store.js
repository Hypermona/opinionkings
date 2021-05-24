import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import users from "./users";
import theme from "./theme";

export default configureStore({
  reducer: {
    posts,
    users,
    theme,
  },
});
