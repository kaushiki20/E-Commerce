import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { Store, persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
