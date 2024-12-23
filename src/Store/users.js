import { useState } from "react";
import { createContainer } from "unstated-next";

function Users(initialCount = []) {
  let [users, setUsers] = useState({ data: {}, fetching: true, error: {} });
  let [user, setUser] = useState({});
  return {user, users,setUser, setUsers };
}
export default createContainer(Users);
