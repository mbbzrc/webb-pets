const orderProductsRouter = require("express").Router();
const {
  destroyOrderProduct,
  updateOrderProduct,
} = require("../db/orderProducts");
const { requireUser } = require("./utils");

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

      res.send(updatedOrderProduct);
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
      const deleteOrderProduct = await destroyOrderProduct(orderProductId);

      res.send(deleteOrderProduct);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

ordersRouter.post(
  "/orders/:orderId/products",
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

module.exports = orderProductsRouter;
