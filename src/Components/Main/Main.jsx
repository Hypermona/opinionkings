import React from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider } from "urql";
import { getToken } from "../../Store/token";

const client = createClient({
  url: process.env.REACT_APP_API_END_POINT,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  },
});

function Main() {
  console.log("hello");
  return (
    <Provider value={client}>
      <Router>
        <Header />
        <Body />
      </Router>
    </Provider>
  );
}

export default Main;
