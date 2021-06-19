import { useState } from "react";
import { createContainer } from "unstated-next";

function Users(initialCount = []) {
  let [users, setUsers] = useState(initialCount);
  return { users, setUsers };
}
export default createContainer(Users);
