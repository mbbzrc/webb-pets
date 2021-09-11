import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getAllProducts, formatCurrency } from "../api";

export const AllProducts = ({search_filter=null}) => {
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const fetchedProducts = await getAllProducts();
    setProductList(fetchedProducts.filter(product =>{
      if (!search_filter) return product

      if ( product.name.toLowerCase().includes(search_filter.toLowerCase())) return product

    }));
  };

  useEffect(() => {
    fetchData();
  }, [search_filter]);

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
