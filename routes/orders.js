const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getCartByUser,
    cancelOrder,
    updateOrder,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils")


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

ordersRouter.get("/:orderId", async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await getOrderById(orderId);

        res.send(order);
    } catch (error) {
        throw error;
    }
})


ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await getCartByUser(req.user);

        if (cart) {
            res.send(cart);
        } else {
            next({ message: "Cannot get card by selected user." });
            return;
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
    const {orderId} = req.params;
    const {status} = req.body;

    try {
        const order = await updateOrder(orderId, {status});
        res.send(order);
    } catch (error) {
        next(error);
    }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
    const {orderId} = req.params;

    try {
        const order = await cancelOrder(orderId);
        res.send(order);
    } catch (error) {
        next(error)
    }
})


module.exports = ordersRouter
