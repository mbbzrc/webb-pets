import React, { useState } from "react";

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

export const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: "abeesley",
    firstName: "Anthony",
    lastName: "Beesley",
    email: "anthony@gmail.com",
  });

  const [cart, setCart] = useState(null);

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
