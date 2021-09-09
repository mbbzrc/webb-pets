import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getAllProducts, formatCurrency } from "../api";

export const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const fetchedProducts = await getAllProducts();
    setProductList(fetchedProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-products">
      {/* CATEGORIES FILTER */}
      {productList.length > 0 &&
        productList.map(({ id, name, price, imageURL }) => {
          return (
            <div className="thumbnail-product" key={id}>
              <h2>
                <Link to={`/product/${id}`}>{name}</Link>
              </h2>
              <div className="thumbnail-product-image">
                <img src={imageURL} />
              </div>
              <div className="thumbnail-product-details">
                <div className="thumbnail-product-price">
                  {formatCurrency(price)}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
