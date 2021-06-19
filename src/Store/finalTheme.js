import { useState } from "react";
import { createContainer } from "unstated-next";

const theme = window.matchMedia("prefers-color-scheme: dark").matches;

function FinalTheme(initialCount = []) {
  let [finalTheme, setFinalTheme] = useState(theme);
  return { finalTheme, setFinalTheme };
}
export default createContainer(FinalTheme);
