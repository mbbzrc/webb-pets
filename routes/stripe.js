const express = require("express");
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


stripeRouter.post("/pay", async (req, res, next) => {
 
try {
  const charge = await stripe.charges.create(req.body);
  res.send({ charge });

  console.log('CHARGE ->', charge)

  res.send({charge});
} catch (error) {
  res.status(500).send({ error });
}

});

module.exports = stripeRouter;