import { useState } from "react";
import { createContainer } from "unstated-next";

function Token(initialData = { token: "", user: {} }) {
  const [authData, setAuthData] = useState(initialData);
  const getToken = () => authData.token;
  const getUser = () => authData.user;
  const setUser = (user)=>setAuthData((prev)=>({...prev,user}))
  const updateFollowing = (following) => {
    if(following){
      setAuthData((prev) => ({ ...prev, user: { ...prev.user, following: [...following] } }));
    }
  };
  const setToken = (token, user) => {
    setAuthData({ token, user });
  };
  const deleteToken = () => {
    setAuthData(initialData);
  };
  return { getToken, setToken, getUser,setUser, deleteToken, updateFollowing };
}
export default createContainer(Token);
