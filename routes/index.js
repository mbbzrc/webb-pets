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

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const ordersRouter = require('../../routes/orders');
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;
