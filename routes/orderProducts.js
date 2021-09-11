const orderProductsRouter = require("express").Router();
const {
  destroyOrderProduct,
  updateOrderProduct,
  addProductToOrder,
} = require("../db/orderProducts");
const { requireUser } = require("./utils");

orderProductsRouter.post(
  "/order/:orderId",
  requireUser,
  async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
      const addedOrderProduct = await addProductToOrder({
        orderId,
        productId,
        price,
        quantity,
      });
      res.send(addedOrderProduct);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

orderProductsRouter.patch(
  "/:orderProductId",
  requireUser,
  async (req, res, next) => {
    const { orderProductId } = req.params;
    const { price, quantity } = req.body;

    try {
      const updatedOrderProduct = await updateOrderProduct({
        id: orderProductId,
        price: price,
        quantity: quantity,
      });

      if (updatedOrderProduct) res.send(updatedOrderProduct);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

orderProductsRouter.delete(
  "/:orderProductId",
  requireUser,
  async (req, res, next) => {
    const { orderProductId } = req.params;

    try {
      const deletedOrderProduct = await destroyOrderProduct(orderProductId);

      res.send(deletedOrderProduct);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = orderProductsRouter;
