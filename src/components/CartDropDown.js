import React from "react";
import "./CartDropDown.scss";
import { selectCartItems } from "../redux/CartSelectors";
import CartItem from "./CartItem";
import CustomButton from "./CustomButton";
import { connect } from "react-redux";
const CartDropDown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItems) => (
        <CartItem key={cartItems.id} item={cartItems} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});
export default connect(mapStateToProps)(CartDropDown);
