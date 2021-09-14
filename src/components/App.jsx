import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  Header,
  Categories,
  Register,
  Login,
  Account,
  AllProducts,
  Product,
  Order,
} from "./index";

import {
  getCartByUserId,
  addProductToOrder,
  updateOrderProduct,
  createOrder,
} from "../api";

export const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null
  );

  const [visitorCart, setVisitorCart] = useState(
    JSON.parse(localStorage.getItem("visitorCart")) || []
  );

  const [searchFilter, setSearchFilter] = useState(null);

  const mergeCart = async ({ id: userId }) => {
    try {
      const existingCart = await getCartByUserId(userId);
      if (!existingCart) {
        const { id: orderId } = await createOrder(userId);
        await Promise.all(
          visitorCart.map(
            async ({ id: productId, price, quantity }) =>
              await addProductToOrder(orderId, productId, price, quantity)
          )
        );
      } else {
        toast.info("Cart has been added to your account.", { autoClose: 5000 });
        await Promise.all(
          visitorCart.map(async ({ id: productId, price, quantity }) => {
            const [productToUpdate] = existingCart.orderProducts.filter(
              (product) => product.productId === productId
            );
            if (!productToUpdate) {
              const { id: orderId } = existingCart;
              await addProductToOrder(orderId, productId, price, quantity);
            } else {
              const { orderProductId, quantity: oldQuantity } = productToUpdate;
              const newQuantity = oldQuantity + quantity;
              await updateOrderProduct(orderProductId, price, newQuantity);
            }
          })
        );
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      cart && localStorage.setItem("cart", JSON.stringify(cart));
    } else if (visitorCart && visitorCart.length > 0) {
      localStorage.setItem("visitorCart", JSON.stringify(visitorCart));
    } else {
      localStorage.removeItem("visitorCart");
    }
  }, [currentUser, cart, visitorCart]);

  return (
    <div id="app">
      <Router>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCart={setCart}
          setVisitorCart={setVisitorCart}
          handleSearch={setSearchFilter}
        />
        <ToastContainer autoClose={3000} position={"bottom-right"} />
        <Route exact path="/">
          <Categories handleSearch={setSearchFilter} />
        </Route>
        {!currentUser ? (
          <>
            <Route path="/account/register">
              <Register
                setCurrentUser={setCurrentUser}
                visitorCart={visitorCart}
                setVisitorCart={setVisitorCart}
                setCart={setCart}
                mergeCart={mergeCart}
              />
            </Route>
            <Route path="/account/login">
              <Login
                setCurrentUser={setCurrentUser}
                visitorCart={visitorCart}
                setVisitorCart={setVisitorCart}
                setCart={setCart}
                mergeCart={mergeCart}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path="/account">
              <Account currentUser={currentUser} />
            </Route>
          </>
        )}
        <Route path="/products">
          <AllProducts searchFilter={searchFilter} />
        </Route>
        <Route path="/product/:productId">
          <Product
            currentUser={currentUser}
            cart={cart}
            setCart={setCart}
            visitorCart={visitorCart}
            setVisitorCart={setVisitorCart}
          />
        </Route>
        <Route path="/order/:orderId">
          <Order />
        </Route>
        <Route path="/cart">
          <Order
            cart={cart}
            setCart={setCart}
            visitorCart={visitorCart}
            setVisitorCart={setVisitorCart}
            currentUser={currentUser}
          />
        </Route>
      </Router>
    </div>
  );
};
