import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import Shop from "./pages/Shop";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Shop" component={Shop} />
      </Switch>
    </div>
  );
}
export default App;
