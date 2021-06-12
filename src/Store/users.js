import { useState } from "react";

export default function Users(initialCount = []) {
  let [users, setUsers] = useState(initialCount);
  return { users, setUsers };
}
