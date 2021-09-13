import React from "react";

import { formatCurrency } from "../api";

export const OrderCompleted = ({ openOrder }) => {
  const { orderProducts } = openOrder;

  return (
    <>
    <div className="my-cart">
  <h2 className="order-title">Order #{openOrder.orderId}</h2>
    {console.log(openOrder)}
      <p>Date placed: {openOrder.datePlaced}</p>
      <div className="cart-items">
      {orderProducts.length > 0 &&
        orderProducts.map(
          ({ name, price, quantity, imageURL, orderProductId, index }) => {
            return (
              <div className="order-product" key={orderProductId}>
                <img
                  src={imageURL}
                  alt="product thumbnail"
                  className="image-thumbnail"
                />
                <p> Item #{index}</p>
                <span className="product-title">Product: {name}</span>
                <p>Quantity: {quantity}</p>
                <p>Item price: {formatCurrency(price)}</p>
                <p>Product subtotal: ${(price * quantity).toFixed(2)}</p>
              </div>
            );
          }
        )}
        </div>
        </div>
    </>
  );
};
