import { useState } from "react";
import { createContainer } from "unstated-next";

function Theme(initialCount) {
  let [theme, setTheme] = useState(true);
  return { theme, setTheme };
}
export default createContainer(Theme);
