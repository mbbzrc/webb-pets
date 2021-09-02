import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import { getOrder } from "../api";

export const Order = ({ cart }) => {
  const [openOrder, setOpenOrder] = useState(null);

  const { pathname } = useLocation();

  const params = useParams();

  const fetchData = async () => {
    try {
      const fetchedOrder = await getOrder(params.orderId);
      setOpenOrder(fetchedOrder);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pathname === "/cart") {
      setOpenOrder(cart);
    } else if (params.orderId) {
      fetchData();
    }
  }, []);

  return (
    <>
      {openOrder ? (
        <div className="order">
          <h3>Order #{openOrder.id}</h3>
          {openOrder.status == "created" ? (
            <p>Items in cart:</p>
          ) : openOrder.status == "completed" ? (
            <p>Date placed: {openOrder.datePlaced}</p>
          ) : openOrder.status == "canceled" ? (
            <p>Status: order canceled</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
