const stripeRouter = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/pay", async (req, res, next) => {
  try {
    const charge = await stripe.charges.create(req.body);
    res.send({ success: charge });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = stripeRouter;
