import React from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { getToken } from "../../Store/token";

const url = "http://localhost:4000/";
// const url=process.env.REACT_APP_API_END_POINT

const client = createClient({
  url: url,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        exchanges: [devtoolsExchange, dedupExchange, cacheExchange({}), fetchExchange],
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
