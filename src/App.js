import React from "react";
import store from "./Redux/store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div>hello</div>
    </Provider>
  );
}

export default App;
