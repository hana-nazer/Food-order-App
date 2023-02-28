import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  // cartContext is assigned to cartctx so that we can access the data
  // in the context in different components there by avoiding props drilling
  const cartctx = useContext(cartContext);

  // to remove the selected item in cart when clicking - icon
  const removeItemHandler = (id) => {
    cartctx.removeItem(id);
  };

  //   to add the selected item in cart when clicking + icon
  const addItemHandler = (item) => {
    // passing the item and amount increasing by 1
    cartctx.addItem({ ...item, amount: 1 });
  };

  // listing cartitems using map and a new component named CartItem is used to show that
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

  // checking the cart is empty or not , using this to show or hide the order button
  // if no items order button is hided
  const hasItems = cartctx.items.length > 0;

  // taking the total amount and placing exact two decimals after point
  const totalAmount = cartctx.totalAmount.toFixed(2);
  return (
    // Modal component onClick is assigned to onHide passed as props,
    // passing this to close cart when clicking backdrop
    <Modal onClick={props.onHide}>
      <div className={classes["cart-items"]}>
        {/* listing cartitems */}
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
