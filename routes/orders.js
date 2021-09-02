const express = require("express");
const ordersRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getCartByUser,
  getOrdersByUser,
  updateOrder,
  cancelOrder,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");

ordersRouter.get("/", [requireUser, requireAdmin], async (req, res, next) => {
  try {
    const allorders = await getAllOrders();

    res.send(allorders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const order = await createOrder({
      status: "created",
      userId: req.user.id,
    });
    if (order) {
      res.send(order);
    } else {
      next({ message: "Cannot create order at this time." });
      return;
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:userId/cart", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getCartByUser(userId);

    if (cart) {
      res.send(cart);
    } else {
      next({
        name: "NoCartError",
        message: "Cannot get cart by selected user.",
      });
      return;
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:userId/allorders", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orderList = await getOrdersByUser(userId);
    if (orderList) {
      res.send(orderList);
    } else {
      next({
        name: "NoOrdersError",
        message: "There are no existing orders for this user.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);

    res.send(order);
  } catch (error) {
    throw error;
  }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { userId, status } = req.body;

    const updatedOrder = await updateOrder({
      id: orderId,
      status: status,
      userId: userId,
    });

    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await cancelOrder(orderId);

    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
