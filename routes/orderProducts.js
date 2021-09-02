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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
    }
  }
);

ordersRouter.post("/orders/:orderId/products", requireUser, async(req, res, next) => {
    const {orderId} = req.params;
    const {productId, price, quantity} = req.body;
    try {
        const addedOrderProduct = await addProductToOrder({
            orderId,
            productId,
            price,
            quantity});

        res.send(addedOrderProduct)
    } catch (error) {
        throw error;
    }
})

module.exports = orderProductsRouter;
