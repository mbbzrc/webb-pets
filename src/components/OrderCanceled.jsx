import React from "react";

import { formatCurrency } from "../api";

export const OrderCanceled = ({ openOrder }) => {
  const { orderProducts } = openOrder;

  return (
    <>
      <p>Status: order canceled</p>
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
