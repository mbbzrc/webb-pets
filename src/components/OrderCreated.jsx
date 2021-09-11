import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { OrderProduct } from "./index";
import { updateOrder, getCartByUserId } from "../api";

import { formatCurrency } from "../api";
import { BASE_URL } from "../api/index";

const STRIPE_KEY =
  "pk_test_51JW40NGfeiZyi0bkzQs8BV34mMmKvaUDgmsf1ciXrLlMKqCs7nJncEu4H8WpCM1vnN9pxOocNckKSK04iQOChC7R00gecuqekO";
const PAYMENT_URL = `${BASE_URL}/api/stripe/pay`;
const CURRENCY = "USD";

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

  const [orderPrice, setOrderPrice] = useState(null);
  const history = useHistory();

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

  useEffect(() => {
    if (orderProducts && orderProducts.length > 0) {
      const orderPrice = orderProducts.reduce((total, { price, quantity }) => {
        return total + price * quantity;
      }, 0);

      setOrderPrice(orderPrice);
    } else {
      setOrderPrice(null);
    }
  }, [cart, visitorCart, orderProducts]);

  const handleCompleteOrder = async ({
    setVisitorCart,
    currentUser,
    setCart,
    orderId,
  }) => {
    const status = "completed";

    try {
      swal(
        "Success!",
        "Thank you for your order! Please check your email for your receipt & shipping updates!",
        "success"
      );

      if (currentUser) {
        await updateOrder(orderId, status, currentUser.id);

        setCart(null);
      }
      setVisitorCart([]);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleToken = (amount) => async (token) => {
    try {
      const response = await axios.post(PAYMENT_URL, {
        source: token.id,
        currency: CURRENCY,
        amount,
      });
      const data = response.data;
      if (data && currentUser) {
        const existingCart = await getCartByUserId(currentUser.id);
        const orderId = existingCart.id;
        await handleCompleteOrder({ setVisitorCart, currentUser, setCart, orderId });

        history.push(`order/${orderId}`);
      } else if (data) {
        await handleCompleteOrder({ setVisitorCart, currentUser, setCart });
      } else {
        swal(
          "Oops!",
          "Unable to process payment! Please contact customer service.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      {orderSubtotal ? (
        <StripeCheckout
          stripeKey={STRIPE_KEY}
          token={handleToken(orderPrice * 100)}
          name="Webb Pets"
          billingAddress
          shippingAddress
          amount={orderPrice * 100}
          currency={CURRENCY}
        ></StripeCheckout>
      ) : null}
    </>
  );
};