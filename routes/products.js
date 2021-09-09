const productsRouter = require("express").Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  destroyProduct,
  updateProduct,
} = require("../db/products");
const { getOrdersByProduct } = require("../db/orders");
const { isAdmin } = require("./utils");

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
    const product = await getProductById(productId);

    if (!product) {
      throw Error("Invalid Product");
    }

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post("/", isAdmin, async (req, res, next) => {
  const { name, description, price, imageURL, inStock, category } = req.body;

  try {
    const newProduct = await createProduct({
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    });
    res.send(newProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await destroyProduct({ productId });
    res.send(deletedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, imageURL, inStock, category } = req.body;

  try {
    const updatedProduct = await updateProduct({
      productId,
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    });

    res.send(updatedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/:productId/orders", isAdmin, async (req, res, next) => {
  const { productId } = req.params;
  try {
    const ordersByProduct = getOrdersByProduct(productId);
    res.send(ordersByProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
