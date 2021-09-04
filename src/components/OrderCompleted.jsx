import React from "react";

export const OrderCompleted = ({ openOrder }) => {
  return (
    <>
      <p>Date placed: {openOrder.datePlaced}</p>
    </>
  );
};
