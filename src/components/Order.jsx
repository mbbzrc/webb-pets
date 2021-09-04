import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import { getOrder } from "../api";

import { OrderCreated, OrderCompleted, OrderCanceled } from "./index";

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

  const renderSwitch = () => {
    switch (openOrder.status) {
      case "created":
        return <OrderCreated openOrder={openOrder} />;
      case "completed":
        return <OrderCompleted openOrder={openOrder} />;
      case "canceled":
        return <OrderCanceled openOrder={openOrder} />;
      default:
        return null;
    }
  };

  return (
    <>{openOrder ? <div className="order">{renderSwitch()}</div> : null}</>
  );
};
