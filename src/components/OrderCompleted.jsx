import React from "react";

import { OrderProduct } from "./OrderProduct";

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
      <div className="my-cart">
        <h2 className="order-title">Order #{orderNumber}</h2>
        <p>Date placed: {formatDate(datePlaced)}</p>
        <div className="cart-items">
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
      </div>
    </>
  );
};
