import React from "react";

import { OrderProduct } from "./index";

import { formatCurrency } from "../api";

export const OrderCompleted = ({ openOrder }) => {
  const { orderProducts, orderId, datePlaced } = openOrder;

  const formatDate = (timestamp) => {
    const date = timestamp.slice(0, 10);
    const arr = date.split("-");
    arr.push(arr.shift());
    return arr.join("-");
  };

  const orderNumber = orderId.toString().padStart(6, "0");

  return (
    <>
      <div id="order-completed">
        <h2>Order #{orderNumber}</h2>
        <p>Date placed: {formatDate(datePlaced)}</p>
        <div>
          {orderProducts.length > 0 &&
            orderProducts.map((product) => {
              return (
                <OrderProduct
                  key={product.orderProductId}
                  orderId={orderId}
                  product={product}
                  openOrder={openOrder}
                />
              );
            })}
        </div>
        <h3>
          Order total:{" "}
          {formatCurrency(
            orderProducts.reduce((total, { price, quantity }) => {
              return total + price * quantity;
            }, 0)
          )}
        </h3>
      </div>
    </>
  );
};
