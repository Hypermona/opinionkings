import { useState } from "react";
import { createContainer } from "unstated-next";

function Token(initialData = { token: "", userId: "" }) {
  const [authData, setAuthData] = useState(initialData);
  const getToken = () => authData.token;
  const getUser = () => authData.user;
  const setToken = (token, id) => {
    setAuthData({ token, userId: id });
  };
  const deleteToken = () => {
    setAuthData(initialData);
  };
  return { getToken, setToken, getUser, deleteToken };
}
export default createContainer(Token);
