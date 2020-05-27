import React, { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import Shop from "./pages/Shop";
import SignInAndSignUp from "./pages/SignInAndSignUp";
import Navbar from "./components/NavBar";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/FireBaseUtils";

import { connect } from "react-redux";
import { checkUserSession } from "./redux/UserAction";
import { selectCurrentUser } from "./redux/UserSelectors";
import { createStructuredSelector } from "reselect";
import CheckOut from "./pages/CheckOut";
const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Shop" component={Shop} />
        <Route path="/CheckOut" component={CheckOut} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: (user) => dispatch(checkUserSession(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
