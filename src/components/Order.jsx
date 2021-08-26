import React, { useState, useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";

import { getOrder } from "../api";

export const Order = (props) => {
  const [order, setOrder] = useState(null);

  const location = useLocation();

  const params = useParams();

  const fetchData = async () => {
    // const data = await getOrder(params.orderId);
    // setOrder(data);
  };

  useEffect(() => {
    // fetchData();
  }, [order]);

  return (
    <>
      {location.pathname === "/cart" ? <h2>My Cart</h2> : null}
      {order && (
        <div className="order">
          <h3>Order #{order.id}</h3>
          {order.status == "completed" ? (
            <p>Date placed: {order.datePlaced}</p>
          ) : order.status == "canceled" ? (
            <p>Status: order canceled</p>
          ) : null}
        </div>
      )}
    </>
  );
};
