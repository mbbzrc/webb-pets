import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getProductById } from "../api";

export const Product = (
  {
    // cart, setCart
  }
) => {
  const [openProduct, setOpenProduct] = useState({});

  const [inCart, setInCart] = useState(false);

  // const checkProductInCart = () => {
  //   const inCart = cart.orderProducts.some((product) => {
  //     return product.productId === openProduct.id;
  //   });
  //   inCart ? setInCart(true) : setInCart(false);
  // };

  const params = useParams();

  const fetchData = async () => {
    const fetchedProduct = await getProductById(params.productId);
    setOpenProduct(fetchedProduct);
    // checkProductInCart();
  };

  const { id, name, description, price, imageURL, inStock, category } =
    openProduct;

  useEffect(() => {
    fetchData();
  }, [inCart]);

  const handleAddToCart = async () => {
    try {
      // IF (CURRENT USER), {POST TO API (PASS IN OPENPRODUCT)
      // AND FETCH NEW CART}
      // THEN SET CART STATE, which trips useEffect with cart dependency in App
      // setInCart(true)
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
        <div className="product-price">${price}</div>
        <div className="inStock">
          In stock: {inStock ? "YES, AVAILABLE!" : "PRODUCT UNAVAILABLE"}
        </div>
        <div className="product-description">{description}</div>
        {!inCart ? (
          <span className="material-icons-outlined" onClick={handleAddToCart}>
            add_shopping_cart
          </span>
        ) : // update cart quantity / delete from cart
        null}
      </div>
    </div>
  );
};
