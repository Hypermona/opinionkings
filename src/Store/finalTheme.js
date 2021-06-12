import { useState } from "react";

const theme = window.matchMedia("prefers-color-scheme: dark").matches;

export default function FinalTheme(initialCount = []) {
  let [finalTheme, setFinalTheme] = useState(theme);
  return { finalTheme, setFinalTheme };
}
