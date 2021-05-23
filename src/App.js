import React from "react";
import store from "./Redux/store";
import { Provider } from "react-redux";
import "./App.css";
import Main from "./Components/Main/Main";
import Customization from "./Custom/Customization";

function App() {
  return (
    <Provider store={store}>
      <Customization>
        <Main />
      </Customization>
    </Provider>
  );
}

export default App;
