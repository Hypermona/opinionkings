import { useState } from "react";

export default function Posts(initialCount = []) {
  let [posts, setPosts] = useState(initialCount);
  return { posts, setPosts };
}
