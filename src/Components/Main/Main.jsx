import React from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/",
});

function Main() {
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
