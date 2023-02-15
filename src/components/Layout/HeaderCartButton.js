import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";

function HeaderCartButton(props) {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
}

export default HeaderCartButton;
