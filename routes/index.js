const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const healthRouter = require('./health');
apiRouter.use('/health', healthRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
