import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Customization from "./Custom/Customization";
import Counter from "./Store/state";

function App() {
  return (
    <Counter.Provider>
      <Customization>
        <Main />
      </Customization>
    </Counter.Provider>
  );
}

export default App;
