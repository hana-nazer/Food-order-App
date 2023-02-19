import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
import cartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(cartContext)

  const numberOfCartItems = cartCtx.items.reduce((currNum,item)=>{
    return currNum + item.amount
  },0)
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
