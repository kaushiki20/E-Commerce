import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_PQDMpNyILjBk5in196J2JG0r00AXufPLTa";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Succesful!");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="E-commerce Ltd."
      currency="IND"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeButton;
