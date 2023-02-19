import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
import cartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(cartContext)
const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)
  const numberOfCartItems = cartCtx.items.reduce((currNum,item)=>{
    return currNum + item.amount
  },0)

  const btnClasses = `${classes.button} ${btnIsHighlighted?classes.bump:''}`
  useEffect(()=>{
    if(cartCtx.items.length===0){
      return
    }
    setBtnIsHighlighted(true)

    const timer=setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)

    return ()=>{
      clearTimeout(timer)
    }
  },[cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
