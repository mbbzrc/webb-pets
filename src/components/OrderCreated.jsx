import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import { OrderProduct } from "./index";

import { formatCurrency } from "../api";
import { BASE_URL } from "../api/index";

const STRIPE_KEY =
  "pk_test_51JW40NGfeiZyi0bkzQs8BV34mMmKvaUDgmsf1ciXrLlMKqCs7nJncEu4H8WpCM1vnN9pxOocNckKSK04iQOChC7R00gecuqekO";
const PAYMENT_URL = `${BASE_URL}/api/stripe/pay`;
const CURRENCY = "USD";

const handleToken = (amount) => async (token) => {
  try {
    const response = await axios.post(PAYMENT_URL, {
      source: token.id,
      currency: CURRENCY,
      amount,
    });

    // set completed order here
  } catch (error) {
    console.error(error);
  }
};

export const OrderCreated = ({
  openOrder,
  currentUser,
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
}) => {
  const [orderProducts, setOrderProducts] = useState(
    openOrder.orderProducts || []
  );

  const [orderSubtotal, setOrderSubtotal] = useState(null);

  useEffect(() => {
    openOrder && setOrderProducts(openOrder.orderProducts || []);
  }, [cart, visitorCart, openOrder]);

  useEffect(() => {
    if (orderProducts && orderProducts.length > 0) {
      const subtotal = formatCurrency(
        orderProducts.reduce((total, { price, quantity }) => {
          return total + price * quantity;
        }, 0)
      );
      setOrderSubtotal(subtotal);
    } else {
      setOrderSubtotal(null);
    }
  }, [cart, visitorCart, orderProducts]);

  return (
    <>
      <h2>My Cart {currentUser && `(${currentUser.firstName})`}</h2>
      {!currentUser && <p>Log in or register to save your cart!</p>}
      <p>Items in cart:</p>
      {orderProducts &&
        orderProducts.length > 0 &&
        orderProducts.map((product, index) => {
          const { orderId } = openOrder;
          return (
            <OrderProduct
              orderId={orderId}
              product={product}
              index={index}
              currentUser={currentUser}
              setCart={setCart}
              visitorCart={visitorCart}
              setVisitorCart={setVisitorCart}
              key={product.orderProductId || product.id}
            />
          );
        })}
      <p>Order Subtotal: {orderSubtotal || <span>order is empty</span>}</p>
      {console.log(orderSubtotal)}
      {orderSubtotal && (
        <StripeCheckout
          stripeKey={STRIPE_KEY}
          token={handleToken(orderSubtotal * 100)}
          name="Webb Pets"
          billingAddress
          shippingAddress
          amount={orderSubtotal * 100}
          currency={CURRENCY}
        />
      )}
    </>
  );
};
