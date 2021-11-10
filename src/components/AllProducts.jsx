import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getAllProducts, formatCurrency } from "../api";

export const AllProducts = ({ searchFilter = null, setSearchFilter }) => {
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const fetchedProducts = await getAllProducts();
    if (!searchFilter) {
      setProductList(fetchedProducts);
    } else {
      setProductList(
        fetchedProducts.filter((product) => {
          const searchString = [
            product.name,
            product.description,
            product.category,
          ].join(" ");
          if (searchString.toLowerCase().includes(searchFilter.toLowerCase())) {
            return product;
          }
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchFilter]);

  return (
    <>
      <h2>{searchFilter ? searchFilter : "products"}</h2>
      {searchFilter && (
        <div id="all-products-link" onClick={() => setSearchFilter(null)}>
          &lt;&lt; All products
        </div>
      )}
      <div id="all-products">
        {productList.length > 0 &&
          productList.map(({ id, name, price, imageURL }) => {
            return (
              <div className="thumbnail-product" key={id}>
                <Link
                  to={`/product/${id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: "2",
                  }}
                >
                  <div className="thumbnail-product-image">
                    <img src={imageURL} />
                  </div>
                  <h3>{name}</h3>
                </Link>
                <div className="thumbnail-product-price">
                  Price: {formatCurrency(price)}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
