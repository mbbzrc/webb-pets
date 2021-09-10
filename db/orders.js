const client = require("./client");

async function createOrder({ status, userId }) {
  const currentDate = new Date();

  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders(status, "userId", "datePlaced")
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [status, userId, currentDate]
    );

    if (!order) {
      throw {
        name: "CreateOrderError",
        message: "Error creating order.",
      };
    }

    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT id AS "orderId", status, "userId", "datePlaced"
        FROM orders
        WHERE id = $1;
        `,
      [orderId]
    );

    if (!order) {
      throw {
        name: "OrderNotFound",
        message: "Order with selected id cannot be found.",
      };
    }

    const { rows: order_products } = await client.query(
      `
        SELECT order_products.id AS "orderProductId", "productId", order_products.price, quantity, name, description, "imageURL", "inStock", category
        FROM order_products
        INNER JOIN products ON products.id = "productId"
        WHERE "orderId" = $1;
        `,
      [orderId]
    );

    order.orderProducts = order_products;

    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser(userId) {
  try {
    const { rows: results } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId" = $1;
        `,
      [userId]
    );

    if (!results) return;

    const orders = await Promise.all(
      results.map(async (result) => {
        const { id: orderId } = result;
        const { rows: order_products } = await client.query(
          `
        SELECT order_products.id AS "orderProductId", "productId", order_products.price, quantity, name, description, "imageURL", "inStock", category
        FROM order_products
        INNER JOIN products ON products.id = "productId"
        WHERE "orderId" = $1;
        `,
          [orderId]
        );

        result.orderProducts = order_products;

        return result;
      })
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByProduct(id) {
  try {
    const { rows: orderIds } = await client.query(
      `
            SELECT orders.id
            FROM orders
            JOIN order_products ON orders.id=order_products."orderId"
            JOIN products ON products.id=order_products."productId"
            WHERE products.id=$1
        `,
      [id]
    );

    if (!orderIds.length > 0) {
      throw {
        name: "OrderWithProductNotFound",
        message: "Orders for this product cannot be found.",
      };
    }

    return await Promise.all(orderIds.map((orders) => getOrderById(order.id)));
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
            SELECT * 
            FROM orders;
        `);

    if (!rows.length > 0) {
      throw {
        name: "NoOrdersError",
        message: "There are no existing orders.",
      };
    }

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId" = $1
            AND status = 'created';
        `,
      [userId]
    );

    if (!order) return null;

    const { rows: order_products } = await client.query(
      `
        SELECT order_products.id AS "orderProductId", "productId", order_products.price, quantity, name, description, "imageURL", "inStock", category
        FROM order_products
        INNER JOIN products ON products.id = "productId"
        WHERE "orderId" = $1;
        `,
      [order.id]
    );

    order.orderProducts = order_products;

    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder({ id, status, userId }) {
  const updateFields = {};

  if (status) {
    updateFields.status = status;
  }

  if (userId) {
    updateFields.userId = userId;
  }

  const setString = Object.keys(updateFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [updatedOrder],
    } = await client.query(
      `
        UPDATE orders
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `,
      Object.values(updateFields)
    );

    if (!updatedOrder) {
      throw {
        name: "UpdateOrderError",
        message: "Error updating order.",
      };
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
}

async function completeOrder({ id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            UPDATE orders
            SET "status"="completed"
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );

    if (!order) {
      throw {
        name: "CompleteOrderError",
        message: "Unable to complete this order.",
      };
    }

    return order;
  } catch (error) {
    throw error;
  }
}

async function cancelOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET "status"="cancelled" 
        WHERE id=$1
        RETURNING *;`,
      [id]
    );

    if (!order) {
      throw {
        name: "CancelOrderError",
        message: "Unable to cancel this order.",
      };
    }

    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  updateOrder,
  completeOrder,
  cancelOrder,
};
