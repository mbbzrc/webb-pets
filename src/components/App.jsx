import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header, Register, Login, AllProducts, Product } from "./index";

export const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="App">
      <h1>Grace Pets</h1>
      <Router>
        <Header currentUser={currentUser} />
        <Route path="/account/register">
          <Register setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/account/login">
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/products">
          <AllProducts />
        </Route>
        <Route path="/product/:productId">
          <Product />
        </Route>
      </Router>
    </div>
  );
};
