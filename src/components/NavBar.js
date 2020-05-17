import React from "react";
import { ReactComponent as Logo } from "./assests/crown.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cart from "./Cart";
import { auth } from "../firebase/FireBaseUtils";
import "./NavBar.scss";
import CartDropDown from "./CartDropDown";
const NavBar = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
            }}
          >
            {" "}
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN-IN
          </Link>
        )}
        <Cart />
      </div>
      {hidden ? null : <CartDropDown />}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(NavBar);
