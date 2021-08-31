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
} from "./index";

import { getCartByUserId, getUser, getUserToken } from "../api";

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const [cart, setCart] = useState(null);

  const fetchCartData = async () => {
    const cart = await getCartByUserId(currentUser.id);
    setCart(cart);
  };

  useEffect(() => {
    if (currentUser) {
      fetchCartData();
    }
  }, [currentUser]);

  useEffect(() => {
    // is this needed for setting the cart?
  }, [cart]);

  useEffect(() => {
    if (getUserToken()) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  // useEffect with cart dependency and fetchData function to get user's cart from DB if signed in, or from localStorage?

  // Function to check localStorage for cart and merge it to signed in user's DB cart?

  return (
    <div id="app">
      <Router>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        {/* HOME PAGE, WITH PRODUCT CATEGORIES? */}
        {!currentUser ? (
          <>
            <Route path="/account/register">
              <Register setCurrentUser={setCurrentUser} />
            </Route>
            <Route path="/account/login">
              <Login setCurrentUser={setCurrentUser} />
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
          <Order />
        </Route>
      </Router>
    </div>
  );
};
