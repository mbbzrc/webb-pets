import React, { useState } from "react";

export const Account = ({ currentUser }) => {
  const [userOrders, setUserOrders] = useState();
  // DESTRUCTURE ORDERS WITH ORDER PRODUCTS, AND MAP BELOW

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
        {
          // MAP ORDERS + ORDER PRODUCTS HERE
        }
      </div>
    </div>
  );
};
