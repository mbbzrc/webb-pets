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
  const { userId } = req.body;
  try {
    const order = await createOrder({ status: "created", userId: userId });

    res.send(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:userId/cart", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getCartByUser(userId);

    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:userId/allorders", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orderList = await getOrdersByUser(userId);

    res.send(orderList);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);

    res.send(order);
  } catch ({ name, message }) {
    next({ name, message });
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
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await cancelOrder(orderId);

    res.send(deletedOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
