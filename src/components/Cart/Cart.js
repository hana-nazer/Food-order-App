import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          order
        </button>
      )}
    </div>
  );

  const orderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-bb949-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true)
    cartctx.clearCart()
  };

  const cartModalContent = (
    <Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={orderHandler} onCancel={props.onHide} />
      )}
      {!isCheckout && cartActions}
    </Fragment>
  );
  const submitModalContent = <p>Sending Data ....</p>;
  const didSubmitContent = <Fragment>
    <p>Confirmed the order successfully</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHide}>
        close
      </button>
      
    </div>
  </Fragment>
  return (
    // Modal component onClick is assigned to onHide passed as props,
    // passing this to close cart when clicking backdrop
    <Modal onClick={props.onHide}>
      <div className={classes["cart-items"]}>
        {/* listing cartitems */}
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting  && submitModalContent}
        {!isSubmitting&& didSubmit && didSubmitContent}
      </div>
    </Modal>
  );
}

export default Cart;
