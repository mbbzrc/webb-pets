const healthRouter = require("express").Router();

healthRouter.get("/", async (req, res, next) => {
  res.send({
    message: "HEALTHY",
  });
});

module.exports = healthRouter;
