import { useState } from "react";

export default function Theme(initialCount) {
  let [theme, setTheme] = useState(true);
  return { theme, setTheme };
}
