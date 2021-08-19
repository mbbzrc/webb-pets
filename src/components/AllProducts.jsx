import React, { useEffect } from "react";

import { getAllProducts } from "./api";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);

  const fetchData = async () => {
    const fetchedProducts = await getAllProducts();
    setProductList(fetchedProducts);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="all-products">
      {productList.length > 0 &&
        productList.map(({ id, name, price, imageURL }) => {
          <div className="product-thumbnail" data-id={id}>
            <div className="category-thumbnail">{category}</div>
            <h2>{name}</h2>
            <div className="product-image-thumbnail">
              <img src={imageURL} alt="product thumbnail" />
            </div>
            <div className="product-details-thumbnail">
              <div className="product-price-thumbnail">{price}</div>
            </div>
          </div>;
        })}
    </div>
  );
};

export default AllProducts;
