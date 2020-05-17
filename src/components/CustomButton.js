import React from "react";
import "./CustomButton.scss";
const CustomButton = ({
  children,
  isGoogleSignIn,
  invereted,
  ...otherProps
}) => {
  return (
    <button
      className={`${invereted ? "inverted" : ""}
      ${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default CustomButton;
