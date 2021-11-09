import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { QuantityButton } from "./index";

import {
  getCartByUserId,
  getProductById,
  formatCurrency,
  addProductToOrder,
  updateOrderProduct,
  createOrder,
} from "../api";

export const Product = ({
  currentUser,
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
}) => {
  const [openProduct, setOpenProduct] = useState({});

  let { id, name, description, price, imageURL, inStock, category } =
    openProduct;

  const [itemQuantity, setItemQuantity] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (itemQuantity < 100) {
      setItemQuantity(itemQuantity + 1);
    }
  };

  const checkProductInVisitorCart = () => {
    return (
      visitorCart.length > 0 && visitorCart.some((product) => product.id === id)
    );
  };

  const editProductInVisitorCart = () => {
    const [itemInVisitorCart] = visitorCart.filter(
      (product) => product.id === id
    );
    return {
      ...itemInVisitorCart,
      quantity: itemQuantity + itemInVisitorCart.quantity,
    };
  };

  const checkProductInUserCart = () => {
    if (cart && cart.orderProducts && cart.orderProducts.length > 0) {
      const [results] = cart.orderProducts.filter(
        (product) => product.productId === id
      );
      return results;
    } else {
      return null;
    }
  };

  const params = useParams();

  const fetchData = async () => {
    const fetchedProduct = await getProductById(params.productId);
    setOpenProduct(fetchedProduct);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      if (currentUser) {
        let cartId;
        if (!cart) {
          const newCart = await createOrder(currentUser.id);
          cartId = newCart.id;
        } else {
          cartId = cart.id;
        }
        const { id: productId, price } = openProduct;
        const cartItem = checkProductInUserCart();
        if (cartItem) {
          const { orderProductId, quantity } = cartItem;
          const newQuantity = quantity + itemQuantity;
          await updateOrderProduct(orderProductId, price, newQuantity);
        } else {
          await addProductToOrder(cartId, productId, price, itemQuantity);
        }
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } else {
        if (checkProductInVisitorCart()) {
          const updatedProduct = editProductInVisitorCart();
          const idx = visitorCart.findIndex((product) => product.id === id);
          const newCart = [...visitorCart];
          newCart.splice(idx, 1, updatedProduct);
          setVisitorCart(newCart);
        } else {
          const addedProduct = {
            ...openProduct,
            quantity: itemQuantity,
          };
          setVisitorCart([...visitorCart, addedProduct]);
        }
      }
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div id="product" data-id={id}>
      <ul>
        <Link to="/">Home</Link>
        <span> / </span>
        <span>{category && capitalizeFirstLetter(category)}</span>
      </ul>
      <h2>{name}</h2>
      <img src={imageURL} alt="product thumbnail" />
      <div id="product-price">{formatCurrency(price)}</div>
      <div className="product-box">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
      <div className="product-box">
        <h3>In stock:</h3>
        <p>{inStock ? "AVAILABLE" : "UNAVAILABLE"}</p>
      </div>
      <form id="product-form">
        <button id="add-to-cart" onClick={handleAddToCart}>
          add to cart
        </button>
        <QuantityButton
          itemQuantity={itemQuantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      </form>
    </div>
  );
};
