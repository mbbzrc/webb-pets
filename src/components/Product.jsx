import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  getCartByUserId,
  getProductById,
  formatCurrency,
  addProductToOrder,
  updateOrderProduct,
  createOrder,
} from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: "1rem",
    minWidth: 1000,
    maxWidth: 1000,
    textTransform: "uppercase",
    boxShadow: '1px 1px 5px'

  },
  image: {
    maxWidth: '300px',
    maxHeight: '300px',
    marginRight: "3rem",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    color: "black",
    backgroundColor: "light gray",
    margin: "5px",
    height: "40px",
    width: "200px",
  },
}));

export const Product = ({
  currentUser,
  cart,
  setCart,
  visitorCart,
  setVisitorCart,
}) => {
  const [openProduct, setOpenProduct] = useState({});
  const classes = useStyles();

  let { id, name, description, price, imageURL, inStock, category } =
    openProduct;

  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setItemQuantity(Number(e.target.value));
  };

  const checkProductInVisitorCart = () => {
    return (
      visitorCart.length > 0 && visitorCart.some((product) => product.id === id)
    );
  };

  const editProductInVisitorCart = () => {
    const [itemInVisitorCart] = visitorCart.filter(
      (product) => product.id === id
    );
    return {
      ...itemInVisitorCart,
      quantity: itemQuantity + itemInVisitorCart.quantity,
    };
  };

  const checkProductInUserCart = () => {
    if (cart && cart.orderProducts && cart.orderProducts.length > 0) {
      const [results] = cart.orderProducts.filter(
        (product) => product.productId === id
      );
      return results;
    } else {
      return null;
    }
  };

  const params = useParams();

  const fetchData = async () => {
    const fetchedProduct = await getProductById(params.productId);
    setOpenProduct(fetchedProduct);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = async () => {
    try {
      if (currentUser) {
        let cartId;
        if (!cart) {
          const newCart = await createOrder(currentUser.id);
          cartId = newCart.id;
        } else {
          cartId = cart.id;
        }
        const { id: productId, price } = openProduct;
        const cartItem = checkProductInUserCart();
        if (cartItem) {
          const { orderProductId, quantity } = cartItem;
          const newQuantity = quantity + itemQuantity;
          await updateOrderProduct(orderProductId, price, newQuantity);
        } else {
          await addProductToOrder(cartId, productId, price, itemQuantity);
        }
        const updatedCart = await getCartByUserId(currentUser.id);
        setCart(updatedCart);
      } else {
        if (checkProductInVisitorCart()) {
          const updatedProduct = editProductInVisitorCart();
          const idx = visitorCart.findIndex((product) => product.id === id);
          const newCart = [...visitorCart];
          newCart.splice(idx, 1, updatedProduct);
          setVisitorCart(newCart);
        } else {
          const addedProduct = {
            ...openProduct,
            quantity: itemQuantity,
          };
          setVisitorCart([...visitorCart, addedProduct]);
        }
      }
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="product" data-id={id}>
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <img
                src={imageURL}
                alt="product thumbnail"
                className={classes.image}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 className="product-title">{name}</h2>
                  <Typography variant="body2" gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {/* Item #{index + 1} */}
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
                      <div style={{paddingTop: '2rem'}}>
                        <Button
                          className={classes.button}
                          variant="contained"
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </Button>
                      
                      </div>
                    </label>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid
                  item
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: "3rem",
                  }}
                >
                  <h3>
                    Item Quantity:{" "}
                    <span style={{ color: "#159397", marginLeft: "2.5rem" }}>
                      {itemQuantity}
                    </span>
                  </h3>
                  <h3 style={{ borderBottom: "1px solid black" }}>
                    Product price:{" "}
                    <span
                      style={{
                        color: "#159397",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {formatCurrency(price)}
                    </span>
                  </h3>
                  <h3 style={{ paddingTop: "5px" }}>
                    Item subtotal:{" "}
                    <span style={{ color: "#159397" }}>
                      {formatCurrency(price * itemQuantity)}
                    </span>
                  </h3>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>














      {/* <div className="category">category / {category}</div>
      <h2>{name}</h2>
      <div className="product-image">
        <img src={imageURL} />
      </div>
      <div className="product-details">
        {inStock && (
          <form>
            <label>
              <span>Quantity: </span>
              <input
                type="number"
                value={itemQuantity}
                min={1}
                max={99}
                required
                onChange={handleQuantityChange}
              />
            </label>
          </form>
        )}
        <div className="product-price">{formatCurrency(price)}</div>
        <div className="inStock">
          In stock: {inStock ? "YES, AVAILABLE!" : "PRODUCT UNAVAILABLE"}
        </div>
        <div className="product-description">{description}</div>
        {inStock && (
          <span className="material-icons-outlined" onClick={handleAddToCart}>
            add_shopping_cart
          </span>
        )}
      </div> */}
    </div>
  );
};
