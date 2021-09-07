import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import {
  getCartByUserId,
  getProductById,
  updateOrderProduct,
  formatCurrency,
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

  const [form, setForm] = useState({
    quantity: 1,
    price: null,
  });

  const checkProductInCart = () => {
    return (
      visitorCart.length > 0 && visitorCart.some((product) => product.id === id)
    );
  };

  const editProductInCart = () => {
    const [itemInVisitorCart] = visitorCart.filter(
      (product) => product.id === id
    );
    return {
      ...itemInVisitorCart,
      price: form.price + itemInVisitorCart.price,
      quantity: form.quantity + itemInVisitorCart.quantity,
    };
  };

  const params = useParams();

  const fetchData = async () => {
    const fetchedProduct = await getProductById(params.productId);
    setOpenProduct(fetchedProduct);
    setForm({ ...form, price: fetchedProduct.price });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = (e) => {
    setForm({
      ...form,
      quantity: Number(e.target.value),
      price: Number(e.target.value) * price,
    });
  };

  const handleAddToCart = async () => {
    try {
      if (currentUser) {
        await updateOrderProduct(
          cart.id,
          openProduct.id,
          form.price,
          form.quantity
        );
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } else {
        if (checkProductInCart()) {
          const updatedProduct = editProductInCart();
          const idx = visitorCart.findIndex((product) => product.id === id);
          const newCart = [...visitorCart];
          newCart.splice(idx, 1, updatedProduct);
          setVisitorCart(newCart);
        } else {
          const addedProduct = {
            ...openProduct,
            price: form.price,
            quantity: form.quantity,
          };
          setVisitorCart([...visitorCart, addedProduct]);
        }
      }
    } catch (error) {
      // set error message
      throw error;
    }
  };

  return (
    <div className="product" data-id={id}>
      <div className="category">category / {category}</div>
      <h2>{name}</h2>
      <div className="product-image">
        <img src={imageURL} alt="product" />
      </div>
      <div className="product-details">
        {inStock && (
          <form>
            <label>
              <span>Quantity: </span>
              <input
                type="number"
                value={form.quantity}
                min="1"
                max="99"
                required
                onChange={handleQuantityChange}
              />
            </label>
          </form>
        )}
        <div className="product-price">{formatCurrency(price)}</div>
        <div className="inStock">
          In stock: {inStock ? "YES, AVAILABLE!" : "PRODUCT UNAVAILABLE"}
        </div>
        <div className="product-description">{description}</div>
        {inStock && (
          <span className="material-icons-outlined" onClick={handleAddToCart}>
            add_shopping_cart
          </span>
        )}
        {/* delete from cart */}
      </div>
    </div>
  );
};
