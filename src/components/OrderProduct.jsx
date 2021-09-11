import React, { useState } from "react";

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
  index,
}) => {
  const {
    id,
    orderProductId,
    name,
    description,
    price,
    quantity,
    inStock,
    imageURL,
  } = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (e) => {
    setItemQuantity(Number(e.target.value));
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
    }
  };

  const handleRemoveFromCart = async () => {
    if (currentUser) {
      try {
        await removeOrderProduct(orderProductId);
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } catch (error) {
        console.log(error);
      }
    } else {
      const idx = visitorCart.findIndex((product) => product.id === id);
      const updatedCart = [...visitorCart];
      updatedCart.splice(idx, 1);
      setVisitorCart(updatedCart);
    }
  };

  return (
    <div className="order-product" key={orderProductId}>
      <img src={imageURL} alt="product thumbnail" className="image-thumbnail" />
      <p>Item #{index + 1}</p>
      <span className="product-title">Product: {name}</span>
      <p>{description}</p>
      <form>
        <label>
          <span>Quantity: </span>
          <input
            type="number"
            value={itemQuantity}
            min="1"
            max="99"
            required
            onChange={handleQuantityChange}
          />
          <input
            type="submit"
            value="Update Quantity"
            onClick={handleUpdateOrderProduct}
          />
        </label>
      </form>
      <p>Product price: {formatCurrency(price)}</p>
      <p>Item subtotal: {formatCurrency(price * itemQuantity)}</p>
      <p>In stock: {inStock ? "YES, AVAILABLE!" : "PRODUCT UNAVAILABLE"}</p>
      <span className="material-icons-outlined" onClick={handleRemoveFromCart}>
        remove_shopping_cart
      </span>
    </div>
  );
};
