import React, { useState, useEffect } from "react";

import { getOrdersByUserId } from "../api";

export const Account = ({ currentUser }) => {
  const [userOrders, setUserOrders] = useState();
  // DESTRUCTURE ORDERS WITH ORDER PRODUCTS, AND MAP BELOW

  const [orderList, setOrderList] = useState([]);

  const fetchData = async () => {
    const fetchedOrders = await getOrdersByUserId(currentUser.id);
    setOrderList(fetchedOrders);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { firstName, lastName, email, imageURL, username } = currentUser;

  return (
    <div id="account">
      <h2>My Account</h2>
      <h3>Welcome back, {firstName}!</h3>
      <div id="account-details">
        <img src={imageURL} alt="user avatar"></img>
        <p>Username: {username}</p>
        <p>First name: {firstName}</p>
        <p>Last name: {lastName}</p>
        <p>Email: {email}</p>
      </div>
      <div id="order-products">
        <h3>My Orders</h3>
        <ul>
          {orderList.length > 0 &&
            orderList.map((order) => {
              return (
                <li key={order.id}>
                  Order #{order.id} - {order.status} - {order.datePlaced}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

// THIS IS A CHANGE
