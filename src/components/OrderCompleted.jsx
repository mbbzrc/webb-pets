import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { formatCurrency } from "../api";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "1rem",
    boxShadow: '1px 1px 5px'

  },
  media: {
    height: 140,
  },
});

export const OrderCompleted = ({ openOrder }) => {
  const { orderProducts } = openOrder;
  const classes = useStyles();

  return (
    <>
      <div className="my-cart">
        <h2 className="order-title">Order #{openOrder.orderId}</h2>
        <p>Date placed: {openOrder.datePlaced}</p>
        <div className="cart-items">
          {orderProducts.length > 0 &&
            orderProducts.map(
              ({ name, price, quantity, imageURL, orderProductId, index }) => {
                return (
                  <div className="product" key={orderProductId}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia className={classes.media} image={imageURL} />
                        <CardContent>
                          <h2 style={{ textAlign: "center" }}>{name}</h2>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Quantity: {quantity}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Item price: {formatCurrency(price)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Product subtotal: ${(price * quantity).toFixed(2)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </>
  );
};
