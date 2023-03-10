import React, { useReducer } from "react";
import CartContext from "./cart-context";

// this final mainly is to manage the content and operations in context, why using this is to
// make the context component lean

const defaultState = {
  items: [],
  totalAmount: 0,
};

// reducer function
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedCartItem = state.items.concat(action.item)
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'CLEAR'){
    return defaultState
  }
  return defaultState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };
const clearCartHandler=()=>{
dispatchCartAction({type:"CLEAR"})
}

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
