import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  formatCurrency,
  updateOrderProduct,
  removeOrderProduct,
  getCartByUserId,
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
    height: "200px",
    width: "200px",
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

export const OrderProduct = ({
  currentUser,
  setCart,
  visitorCart,
  setVisitorCart,
  product,
  index,
}) => {
  const {
    id,
    orderProductId,
    name,
    description,
    price,
    quantity,
    inStock,
    imageURL,
  } = product;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const classes = useStyles();

  const handleQuantityChange = (e) => {
    setItemQuantity(Number(e.target.value));
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
      <div className={classes.root}>
        <Paper className={classes.paper} >
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
                          className={classes.button}
                          variant="contained"
                          onClick={handleUpdateOrderProduct}
                        >
                          Update CART
                        </Button>
                        <Button
                          className={classes.button}
                          variant="contained"
                          onClick={handleRemoveFromCart}
                        >
                          Remove From Cart
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
    </div>
  );
};
