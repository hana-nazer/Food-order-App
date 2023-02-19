import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartctx = useContext(cartContext);
  const removeItemHandler = (id) => {
    cartctx.removeItem(id)
  };
  const addItemHandler = (item) => {
    cartctx.addItem({...item,amount:1})
  };
  const cartItems = (
    <ul>
      {cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const hasItems = cartctx.items.length > 0;
  const totalAmount = cartctx.totalAmount.toFixed(2);
  return (
    <Modal onClick={props.onHide} >
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHide}>
            close
          </button>
          {hasItems && <button className={classes.button}>order</button>}
        </div>
      </div>
    </Modal>
  );
}

export default Cart;
