import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";

function HeaderCartButton() {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
}

export default HeaderCartButton;
