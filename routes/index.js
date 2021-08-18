const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const healthRouter = require('./health');
apiRouter.use('/health', healthRouter);
module.exports = apiRouter;
