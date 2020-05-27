import React from "react";
import { ReactComponent as Logo } from "./assests/crown.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cart from "./Cart";
import { auth } from "../firebase/FireBaseUtils";
import { selectCurrentUser } from "../redux/UserSelectors";
import { selectCartHidden } from "../redux/CartSelectors";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import CartDropDown from "./CartDropDown";
import { signOutStart } from "../redux/UserAction";
const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
const NavBar = ({ currentUser, hidden, signOutStart }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <Cart />
      </OptionsContainer>
      {hidden ? null : <CartDropDown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => {
    dispatch(signOutStart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
