const express = require("express");
const ordersRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getCartByUser,
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

ordersRouter.get("/:userId/cart", async (req, res, next) => {
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

ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);

    res.send(order);
  } catch (error) {
    throw error;
  }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {});

module.exports = ordersRouter;
