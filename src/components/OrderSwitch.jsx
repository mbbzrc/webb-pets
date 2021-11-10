import React from "react";

import { OrderCreated, OrderCompleted } from "./index";

export const OrderSwitch = ({
  openOrder,
  currentUser,
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
}) => {
  const renderSwitch = () => {
    switch (openOrder.status) {
      case "created":
        return (
          <OrderCreated
            openOrder={openOrder}
            currentUser={currentUser}
            cart={cart}
            setCart={setCart}
            visitorCart={visitorCart}
            setVisitorCart={setVisitorCart}
          />
        );
      case "completed":
        return <OrderCompleted openOrder={openOrder} />;
      default:
        return null;
    }
  };

  return <>{renderSwitch()}</>;
};
