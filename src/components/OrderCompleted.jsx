import React from "react";

import { formatCurrency } from "../api";

export const OrderCompleted = ({ openOrder }) => {
  const { orderProducts } = openOrder;

  return (
    <>
      <p>Date placed: {openOrder.datePlaced}</p>
      {orderProducts.length > 0 &&
        orderProducts.map(
          ({ name, price, quantity, imageURL, orderProductId, index }) => {
            return (
              <div className="product" key={orderProductId}>
                <img
                  src={imageURL}
                  alt="product thumbnail"
                  className="image-thumbnail"
                />
                <span> Item #{index}</span>
                <span className="product-title">Product: {name}</span>
                <p>Quantity: {quantity}</p>
                <p>Item price: {formatCurrency(price)}</p>
                <p>Product subtotal: ${(price * quantity).toFixed(2)}</p>
              </div>
            );
          }
        )}
    </>
  );
};
