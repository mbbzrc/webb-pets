import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getAllProducts, formatCurrency } from "../api";

export const AllProducts = ({ searchFilter = null }) => {
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const fetchedProducts = await getAllProducts();
    if (!searchFilter) {
      setProductList(fetchedProducts);
    } else {
      setProductList(
        fetchedProducts.filter((product) => {
          if (product.name.toLowerCase().includes(searchFilter.toLowerCase()))
            return product;
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchFilter]);

  return (
    <div className="all-products">
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
