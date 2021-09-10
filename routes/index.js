const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: "TokenNotValidError",
          message: "The token supplied is not valid.",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/health", require("./health"));

apiRouter.use("/products", require("./products"));

apiRouter.use("/users", require("./users"));

apiRouter.use("/orders", require("./orders"));

apiRouter.use("/stripe", require("./stripe"));

apiRouter.use("/order-products", require("./orderProducts"));

module.exports = apiRouter;
