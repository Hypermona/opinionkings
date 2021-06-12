import { useState } from "react";

const theme = window.matchMedia("prefers-color-scheme: dark").matches;

export default function Counter(initialCount = []) {
  let [count, setcount] = useState(0);
  return { count, setcount };
}
