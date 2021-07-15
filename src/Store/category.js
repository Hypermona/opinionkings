import { useState } from "react";
import { createContainer } from "unstated-next";

function Category() {
  let [category, setCategory] = useState({ id: "home" });
  return { category, setCategory };
}
export default createContainer(Category);
