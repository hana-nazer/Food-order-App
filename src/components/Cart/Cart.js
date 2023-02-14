import React from "react";
import Modal from "../UI/Modal";
import classes from './Cart.module.css'

function Cart() {
  const cartItems = (
    <ul>
      {[
        {
          id: "c1",
          name: "sushi",
          price: "34",
          amount: "2",
        },
      ].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal>
   {/* <div className={classes['cart-items ']}> */}
      {cartItems}
      <div className={classes.total}>
        <span>Amount</span>
        <span>567</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>close</button>
        <button className={classes.button}>order</button>
      </div>
     {/* </div> */}
    </Modal>
  
  );
}

export default Cart;
