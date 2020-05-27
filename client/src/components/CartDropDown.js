import React from "react";
import "./CartDropDown.scss";
import { selectCartItems } from "../redux/CartSelectors";
import { withRouter, Link } from "react-router-dom";
import CartItem from "./CartItem";
import CustomButton from "./CustomButton";
import { toggleCartHidden } from "../redux/CartAction";
import { connect } from "react-redux";
const CartDropDown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItems) => (
          <CartItem key={cartItems.id} item={cartItems} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <Link to={{ pathname: "/Checkout" }}>
      <CustomButton
        onClick={() => {
          //history.push("Checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});
export default withRouter(connect(mapStateToProps)(CartDropDown));
