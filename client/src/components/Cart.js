import React from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { toggleCartHidden } from "../redux/CartAction";
import { ReactComponent as ShoppingIcon } from "./assests/Cart.svg";
import { selectCartItemsCount } from "../redux/CartSelectors";
const Cart = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
