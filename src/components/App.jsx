import React, { useState, useEffect } from "react";

import { Route } from "react-router-dom";

import { getSomething } from "../api";

import { Product } from "./index";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Grace Pets</h1>
      <h2>{message}</h2>
      <Route path="/product/:productId">
        <Product />
      </Route>
    </div>
  );
};

export default App;
