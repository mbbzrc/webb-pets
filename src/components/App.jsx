import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Header, AllProducts, Product } from "./index";

export const App = () => {
  return (
    <div className="App">
      <h1>Grace Pets</h1>
      <Router>
        <Header />
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
