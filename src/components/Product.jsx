import React from "react";

const Product = ({id, name, description, price, imageURL, inStock, category}) => {
  return <div className="product">
      <div className="product-image">
          <img src={imageURL} alt="product image" />
      </div>
  </div>;
};

export default Product;
