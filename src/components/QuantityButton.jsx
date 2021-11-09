import React from "react";

export const QuantityButton = ({
  itemQuantity,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <>
      <button
        className="quantity-button button-decrement"
        onClick={handleDecrement}
      >
        -
      </button>
      <input className="quantity" type="text" value={itemQuantity} readOnly />
      <button
        className="quantity-button button-increment"
        onClick={handleIncrement}
      >
        +
      </button>
    </>
  );
};
