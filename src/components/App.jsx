import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Header,
  Register,
  Login,
  Account,
  AllProducts,
  Product,
  Order,
  Cart,
} from "./index";

import { getCartByUserId } from "../api";

export const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );

  const fetchCart = async () => {
    try {
      const fetchedCart = await getCartByUserId(currentUser.id);
      setCart(fetchedCart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser && !cart) {
      fetchCart();
    }
  }, [currentUser, cart]);

  return (
    <div id="app">
      <Router>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        {/* HOME PAGE, WITH PRODUCT CATEGORIES? */}
        {!currentUser ? (
          <>
            <Route path="/account/register">
              <Register setCurrentUser={setCurrentUser} cart={cart} />
            </Route>
            <Route path="/account/login">
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cart={cart}
                setCart={setCart}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="/account">
              <Account currentUser={currentUser} />
            </Route>
          </>
        )}
        <Route path="/products">
          <AllProducts />
        </Route>
        <Route path="/product/:productId">
          <Product cart={cart} setCart={setCart} />
        </Route>
        <Route path="/order/:orderId">
          <Order />
        </Route>
        <Route path="/cart">
          <Cart cart={cart} currentUser={currentUser} />
        </Route>
      </Router>
    </div>
  );
};
