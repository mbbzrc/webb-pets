import React from "react";

import { Order } from "./index";

export const Cart = ({ cart, setCart, currentUser }) => {
  return (
    <div id="cart">
      <h2>My Cart {currentUser ? `(${currentUser.firstName})` : null}</h2>
      <Order cart={cart} setCart={setCart} />
    </div>
  );
};
