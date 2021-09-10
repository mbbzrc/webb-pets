import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import { getOrder } from "../api";

import { OrderSwitch } from "./index";

export const Order = ({
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
  currentUser,
}) => {
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
    if (pathname === "/cart" && currentUser) {
      setOpenOrder(cart);
    } else if (pathname === "/cart" && visitorCart.length > 0) {
      setOpenOrder({ orderProducts: [...visitorCart], status: "created" });
    } else if (pathname === "/cart") {
      setOpenOrder({ status: "created" });
    } else if (params.orderId) {
      fetchData();
    }
  }, [cart, visitorCart]);

  return (
    <>
      {openOrder && (
        <div className="order">
          <OrderSwitch
            openOrder={openOrder}
            currentUser={currentUser}
            cart={cart}
            setCart={setCart}
            visitorCart={visitorCart}
            setVisitorCart={setVisitorCart}
          />
        </div>
      )}
    </>
  );
};
