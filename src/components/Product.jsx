import React from "react";

import { getProductById } from "../api";

const Product = () => {
  const [openProduct, setOpenProduct] = useState({});

  const { id, name, description, price, imageURL, inStock, category } =
    openProduct;

  const fetchData = async () => {
    const fetchedProduct = await getProductById(id);
    setOpenProduct(fetchedProduct);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="product" data-id={id}>
      <div className="category">{category}</div>
      <h2>{name}</h2>
      <div className="product-image">
        <img src={imageURL} alt="product" />
      </div>
      <div className="product-details">
        <div className="product-price">{price}</div>
        <div className="inStock">
          In stock: {inStock ? "YES, IN STOCK!" : "PRODUCT UNAVAILABLE"}
        </div>
        <div className="product-description">{description}</div>
      </div>
    </div>
  );
};

export default Product;
