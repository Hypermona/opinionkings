import { createContainer } from "unstated-next";
import User from "./users";
import Posts from "./posts";
import Theme from "./theme";
import FinalTheme from "./finalTheme";
import Counter from "./counter";
const useStore = (initialUser, initialPost, initialTheme) => {
  const users = User(initialUser);
  const posts = Posts(initialPost);
  const theme = Theme();
  const finalTheme = FinalTheme();
  const counter = Counter();
  return { users, posts, theme, finalTheme, counter };
};

export default createContainer(useStore);
