import React, { useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { QuantityButton } from "./index";

import {
  formatCurrency,
  updateOrderProduct,
  removeOrderProduct,
  getCartByUserId,
} from "../api";

export const OrderProduct = ({
  currentUser,
  setCart,
  visitorCart,
  setVisitorCart,
  product,
}) => {
  const { id, orderProductId, name, price, quantity, imageURL } = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleDecrement = (e) => {
    e.preventDefault();
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (itemQuantity < 100) {
      setItemQuantity(itemQuantity + 1);
    }
  };

  const handleUpdateOrderProduct = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateOrderProduct(orderProductId, price, itemQuantity);
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } catch (error) {
        console.log(error);
      }
    } else {
      const [itemInVisitorCart] = visitorCart.filter(
        (product) => product.id === id
      );
      const updatedProduct = {
        ...itemInVisitorCart,
        quantity: itemQuantity,
      };
      const idx = visitorCart.findIndex((product) => product.id === id);
      const newCart = [...visitorCart];
      newCart.splice(idx, 1, updatedProduct);
      setVisitorCart(newCart);
      toast.success("Quantity updated!");
    }
  };

  const handleRemoveFromCart = async () => {
    if (currentUser) {
      try {
        await removeOrderProduct(orderProductId);
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
        toast.success("Item removed from cart.");
      } catch (error) {
        toast.error(`${error.response.data.message}`);
      }
    } else {
      const idx = visitorCart.findIndex((product) => product.id === id);
      const updatedCart = [...visitorCart];
      updatedCart.splice(idx, 1);
      setVisitorCart(updatedCart);
      toast.success("Item removed from cart.");
    }
  };

  return (
    <div className="order-product" key={orderProductId}>
      <img src={imageURL} alt="product thumbnail" />
      <Link to={`/product/${id}`}>
        <div>{name}</div>
      </Link>
      <div>Item subtotal: {formatCurrency(price * quantity)}</div>{" "}
      <div>Item price: {formatCurrency(price)}</div>
      <form>
        <QuantityButton
          itemQuantity={itemQuantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
        <div className="order-product-edit">
          <button onClick={handleUpdateOrderProduct}>Update</button>
          <button onClick={handleRemoveFromCart}>Remove</button>
        </div>
      </form>
      {/* <div className={classes.root}>

              <img
                src={imageURL}
                alt="product thumbnail"
                className={classes.image}
              />

                  <h2>{name}</h2>

                  <Typography variant="body2" color="textSecondary">
                    Item #{index + 1}
                  </Typography>
                </Grid>

                <Grid item xs>
                  <form>
                    <label style={{ fontSize: "larger" }}>
                      <span style={{ paddingRight: "5px" }}>Quantity: </span>
                      <input
                        style={{ fontSize: "1.4rem", paddingLeft: "10px" }}
                        type="number"
                        value={itemQuantity}
                        min="1"
                        max="99"
                        required
                        onChange={handleQuantityChange}
                      />
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleUpdateOrderProduct}
                        >
                          Update CART
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleRemoveFromCart}
                        >
                          Remove From Cart
                        </Button>
                      </div>
                    </label>
                  </form>
                  <h3>
                    Item Quantity:{" "}
                    <span style={{ color: "#159397", marginLeft: "2.5rem" }}>
                      {itemQuantity}
                    </span>
                  </h3>
                  <h3 style={{ borderBottom: "1px solid black" }}>
                    Product price:{" "}
                    <span
                    >
                      {formatCurrency(price)}
                    </span>
                  </h3>
                  <h3 style={{ paddingTop: "5px" }}>
                    Item subtotal:{" "}
                    <span style={{ color: "#159397" }}>
                      {formatCurrency(price * itemQuantity)}
      </div> */}
    </div>
  );
};
