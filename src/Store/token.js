const AUTH_TOKEN = "auth-token";
const USER_ID = "auth-user";

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const getUser = () => localStorage.getItem(USER_ID);

export const setToken = (token, id) => {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(USER_ID, id);
};
export const deleteToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_ID);
};
