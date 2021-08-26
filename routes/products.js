const productsRouter = require("express").Router();

const { getAllProducts, getProductByID } = require("../db/products");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductByID(productId);

    if (!product) {
      throw Error("Invalid Product");
    }

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
