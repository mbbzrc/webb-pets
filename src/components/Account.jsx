import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { getOrdersByUserId } from "../api";

import { Button } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
    textTransform: 'uppercase'
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "230px",
    maxHeight: "219px",
  },
}));

export const Account = ({ currentUser }) => {
  const [orderList, setOrderList] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const classes = useStyles();

  const fetchData = async () => {
    try {
      const fetchedOrders = await getOrdersByUserId(currentUser.id);
      setOrderList(fetchedOrders);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { firstName, lastName, email, imageURL, username } = currentUser;

  return (
    <div id="account">
      <h2 className="account-title">My Account</h2>
      <h3>Welcome, </h3>
      <h2
        style={{ fontSize: "2rem", paddingTop: "10px", paddingBottom: "10px" }}
      >
        {firstName}
      </h2>

      <Button
        className="accordian-button"
        variant="outlined"
        color="primary"
        onClick={() => {
          setDetailsOpen(!detailsOpen);
        }}
      >
        User Info {detailsOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
      </Button>

      {detailsOpen ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h3 style={{ paddingTop: "5px" }}>Username: </h3>
                  <h2>{username}</h2>
                  <h3 style={{ paddingTop: "5px" }}>First Name: </h3>
                  <h2>{firstName}</h2>
                  <h3 style={{ paddingTop: "5px" }}>Last Name: </h3>
                  <h2>{lastName}</h2>
                  <h3 style={{ paddingTop: "5px" }}>Email: </h3>
                  <h2>{email}</h2>
                </Grid>
              </Grid>

              <Grid item>
                <img
                  className={classes.img}
                  alt="complex"
                  // src={imageURL} 
                  // Use image below for testing purposes 
                  src="assets/userAvatar.png"  
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      ) : (
        ""
      )}
      <div>
        <Button
          className="accordian-button"
          variant="outlined"
          color="primary"
          onClick={() => {
            setOrdersOpen(!ordersOpen);
          }}
        >
          Order History{" "}
          {ordersOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </Button>

        {ordersOpen ? (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h2>Previous Orders:</h2>
                    <ul>
                      {orderList.length > 0 &&
                        orderList.map((order) => {
                          if (order.status !== "created") {
                            return (
                              <li key={order.id} style={{ marginLeft: "10px", paddingTop: '10px' }}>
                                <Link to={`/order/${order.id}`}>
                                  Order #{order.id} - {order.status} -{" "}
                                  {order.datePlaced}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
