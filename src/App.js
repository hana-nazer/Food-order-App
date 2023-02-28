import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  // using this state to show cart based on clicks
  //  initially it is false and when clicking turned to true
  const [showCart, setShowCart] = useState(false);

  // setting the state to true to show the cart
  const showCartHandler = () => {
    setShowCart(true);
  };

  // setting the cart comp hide when clicking close btn or backdrop
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    // cartprovider is to use context
    <CartProvider>
      {/* showing cart based on the conditions passing onHide as props */}
      {showCart && <Cart onHide={hideCartHandler} />}
      {/* header section where cart component is placed */}
      <Header onShow={showCartHandler} />
      <main>
        {/* Listing meal items */}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
