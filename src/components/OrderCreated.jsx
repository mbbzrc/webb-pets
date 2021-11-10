import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import StripeCheckout from "react-stripe-checkout";

import { toast } from "react-toastify";

import { OrderProduct } from "./index";
import { updateOrder, getCartByUserId, createStripeToken } from "../api";

import { formatCurrency } from "../api";

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

  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51JsH8cKFy3CE12wzJ5xeGPaamQUz33iVzfKzX7XcxyE6S3c1TPIUS4NAuRYPzTLTNu0MZ7VT3XjKj77XIiVAY3Lg00CT8jQGoA";

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

      setOrderPrice(Math.round(orderPrice * 100) / 100);
    } else {
      setOrderPrice(null);
    }
  }, [cart, visitorCart, orderProducts]);

  const handleCompleteOrder = async (orderId) => {
    const status = "completed";

    try {
      toast.success("Success! Thanks for your order.");

      if (currentUser) {
        await updateOrder(orderId, status, currentUser.id);
        setCart(null);
      } else {
        setVisitorCart([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onToken = (amount) => async (token) => {
    try {
      const data = await createStripeToken(token, amount);
      if (data && currentUser) {
        const { id: orderId } = await getCartByUserId(currentUser.id);
        await handleCompleteOrder(orderId);
        history.push(`order/${orderId}`);
      } else if (data) {
        await handleCompleteOrder();
      } else {
        toast.error(
          "Unable to process payment! Please contact customer service."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="cart">
        <h2>my cart</h2>
        {orderSubtotal ? (
          <>
            <div id="cart-items">
              {orderProducts &&
                orderProducts.length > 0 &&
                orderProducts.map((product) => {
                  return (
                    <OrderProduct
                      openOrder={openOrder}
                      product={product}
                      currentUser={currentUser}
                      setCart={setCart}
                      visitorCart={visitorCart}
                      setVisitorCart={setVisitorCart}
                      key={product.orderProductId || product.id}
                    />
                  );
                })}
            </div>
          </>
        ) : null}

        {orderSubtotal ? (
          <div id="checkout">
            <h3>Order subtotal: {orderSubtotal}</h3>
            <p>Ready to purchase? Proceed to checkout:</p>
            <StripeCheckout
              stripeKey={STRIPE_PUBLISHABLE_KEY}
              name="WEBB Pets"
              billingAddress
              shippingAddress
              amount={orderPrice * 100}
              token={onToken(orderPrice * 100)}
              currency="USD"
            >
              <button>checkout</button>
            </StripeCheckout>
          </div>
        ) : (
          <h3>Your cart is empty!</h3>
        )}
      </div>
    </>
  );
};
