import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Customization from "./Custom/Customization";
import Provider from "./Store/provider";

function App() {
  return (
    <Provider>
      <Customization>
        <Main />
      </Customization>
    </Provider>
  );
}

export default App;
