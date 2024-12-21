import React, { useMemo } from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import Token from "../../Store/token";
import BottomTab from "../BottomTab/BottomTab";

const url = "http://localhost:4000/";
// const url=process.env.REACT_APP_API_END_POINT



function Main() {
  const { getToken } = Token.useContainer();
  
  const client = useMemo(
    () =>
      createClient({
        url: url,
        fetchOptions: () => {
          const token = getToken();
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
            credentials: "include",
          };
        },
        exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
      }),
    [getToken]
  );
  return (
    <Provider value={client}>
      <Router>
        <Header />
        <Body />
        <BottomTab />
      </Router>
    </Provider>
  );
}

export default Main;
