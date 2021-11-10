import React, { useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { QuantityButton } from "./index";

import {
  formatCurrency,
  updateOrderProduct,
  removeOrderProduct,
  getCartByUserId,
} from "../api";

export const OrderProduct = ({
  currentUser,
  setCart,
  visitorCart,
  setVisitorCart,
  product,
  openOrder,
}) => {
  const { id, productId, orderProductId, name, price, quantity, imageURL } =
    product;
  const [itemQuantity, setItemQuantity] = useState(quantity);

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

  const handleUpdateOrderProduct = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateOrderProduct(orderProductId, price, itemQuantity);
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } catch (error) {
        console.log(error);
      }
    } else {
      const [itemInVisitorCart] = visitorCart.filter(
        (product) => product.id === id
      );
      const updatedProduct = {
        ...itemInVisitorCart,
        quantity: itemQuantity,
      };
      const idx = visitorCart.findIndex((product) => product.id === id);
      const newCart = [...visitorCart];
      newCart.splice(idx, 1, updatedProduct);
      setVisitorCart(newCart);
      toast.success("Quantity updated!");
    }
  };

  const handleRemoveFromCart = async () => {
    if (currentUser) {
      try {
        await removeOrderProduct(orderProductId);
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
        toast.success("Item removed from cart.");
      } catch (error) {
        toast.error(`${error.response.data.message}`);
      }
    } else {
      const idx = visitorCart.findIndex((product) => product.id === id);
      const updatedCart = [...visitorCart];
      updatedCart.splice(idx, 1);
      setVisitorCart(updatedCart);
      toast.success("Item removed from cart.");
    }
  };
  console.log(openOrder);
  return (
    <div className="order-product" key={orderProductId}>
      <img src={imageURL} alt="product thumbnail" />
      <div>
        <Link to={`/product/${productId || id}`}>
          <div>{name}</div>
        </Link>
        <ul>
          <li>Item price: {formatCurrency(price)}</li>
          <li>Item subtotal: {formatCurrency(price * quantity)}</li>
        </ul>
        {openOrder && openOrder.status !== "completed" && (
          <form>
            <QuantityButton
              itemQuantity={itemQuantity}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
            />
            <div className="order-product-edit">
              <button className="update" onClick={handleUpdateOrderProduct}>
                Update
              </button>
              <button className="remove" onClick={handleRemoveFromCart}>
                Remove
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
