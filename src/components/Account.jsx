import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { getOrdersByUserId } from "../api";

export const Account = ({ currentUser }) => {
  const [orderList, setOrderList] = useState([]);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const formatDate = (timestamp) => {
    const date = timestamp.slice(0, 10);
    const arr = date.split("-");
    arr.push(arr.shift());
    return arr.join("-");
  };

  const fetchData = async () => {
    try {
      const fetchedOrders = await getOrdersByUserId(currentUser.id);
      setOrderList(fetchedOrders);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { firstName, lastName, email, username } = currentUser;

  return (
    <div id="account">
      <h2>my account</h2>
      <h3>Welcome, {firstName}!</h3>
      <div id="user-details">
        <h3>Username: </h3>
        <p>{username}</p>
        <h3>First Name: </h3>
        <p>{firstName}</p>
        <h3>Last Name: </h3>
        <p>{lastName}</p>
        <h3>Email: </h3>
        <p>{email}</p>
      </div>
      <div id="previous-orders">
        <button
          onClick={() => {
            setOrdersOpen(!ordersOpen);
          }}
        >
          previous orders
        </button>
        {ordersOpen ? (
          <>
            <h2>previous orders</h2>
            <ul id="previous-orders-list">
              {orderList.length > 0 &&
                orderList.map(({ status, id, orderProducts, datePlaced }) => {
                  if (status !== "created") {
                    return (
                      <li key={id}>
                        <Link to={`/order/${id}`}>
                          <span>
                            {status !== "canceled"
                              ? "Order placed on "
                              : "Order (canceled) on "}
                            {formatDate(datePlaced)}
                          </span>
                        </Link>
                        {orderProducts.map(({ orderProductId, imageURL }) => {
                          return <img key={orderProductId} src={imageURL} />;
                        })}
                      </li>
                    );
                  }
                })}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
