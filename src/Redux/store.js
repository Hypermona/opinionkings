import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import users from "./users";
import theme from "./theme";
import finalTheme from "./finalTheme";
import category from "./category";

export default configureStore({
  reducer: {
    posts,
    users,
    theme,
    category,
    finalTheme,
  },
});
