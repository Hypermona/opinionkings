import { useState } from "react";
import { createContainer } from "unstated-next";

function Posts(initialCount = []) {
  let [posts, setPosts] = useState(initialCount);
  return { posts, setPosts };
}
export default createContainer(Posts);
