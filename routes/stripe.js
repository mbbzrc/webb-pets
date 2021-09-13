const express = require("express");
const stripeRouter = express.Router();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

stripeRouter.post("/pay", async (req, res, next) => {
  try {
    const charge = await stripe.charges.create(req.body);
    console.log('This is the CHARGE', charge)
    res.send({ success: charge });

    res.send({ charge });
  } catch ({name, message}) {
    next ({name, message})
  }
});

module.exports = stripeRouter;
