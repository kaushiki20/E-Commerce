import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_PQDMpNyILjBk5in196J2JG0r00AXufPLTa";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((response) => {
        alert("succesful payment");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("all done");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="E-commerce Ltd."
      billingAddress
      shippingAddress
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeButton;
