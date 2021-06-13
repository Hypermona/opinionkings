import { useState } from "react";
import { createContainer } from "unstated-next";

function Counter(initialCount = []) {
  let [count, setcount] = useState(0);
  return { count, setcount };
}
export default createContainer(Counter);
