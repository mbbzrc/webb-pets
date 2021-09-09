import React, { useState, useEffect } from "react";

import { OrderProduct } from "./index";

import { formatCurrency } from "../api";

export const OrderCreated = ({
  openOrder,
  currentUser,
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
}) => {
  const [orderProducts, setOrderProducts] = useState(
    openOrder.orderProducts || []
  );

  const [orderSubtotal, setOrderSubtotal] = useState(null);

  useEffect(() => {
    openOrder && setOrderProducts(openOrder.orderProducts || []);
  }, [cart, visitorCart, openOrder]);

  useEffect(() => {
    if (orderProducts && orderProducts.length > 0) {
      const subtotal = formatCurrency(
        orderProducts.reduce((total, { price, quantity }) => {
          return total + price * quantity;
        }, 0)
      );
      setOrderSubtotal(subtotal);
    } else {
      setOrderSubtotal(null);
    }
  }, [cart, visitorCart, orderProducts]);

  return (
    <>
      <h2>My Cart {currentUser && `(${currentUser.firstName})`}</h2>
      {!currentUser && <p>Log in or register to save your cart!</p>}
      <p>Items in cart:</p>
      {orderProducts &&
        orderProducts.length > 0 &&
        orderProducts.map((product, index) => {
          const { orderId } = openOrder;
          console.log("PRODUCT =>>> ", product);
          return (
            <OrderProduct
              orderId={orderId}
              product={product}
              index={index}
              currentUser={currentUser}
              setCart={setCart}
              visitorCart={visitorCart}
              setVisitorCart={setVisitorCart}
              key={product.orderProductId || product.id}
            />
          );
        })}
      <p>Order Subtotal: {orderSubtotal || <span>order is empty</span>}</p>
    </>
  );
};
