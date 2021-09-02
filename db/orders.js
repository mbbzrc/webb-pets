const client = require("./client");

async function createOrder({ status, userId, datePlaced }) {
  const {
    rows: [order],
  } = await client.query(
    `
            INSERT INTO orders(status, "userId", "datePlaced")
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
    [status, userId, datePlaced]
  );

  return order;
}

//join products on orderId
async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE id = $1;
        `,
      [id]
    );

    if (!order) {
      throw {
        name: "OrderNotFound",
        message: "Order with selected id cannot be found.",
      };
    }

    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser(id) {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId" = $1;
        `,
      [id]
    );

    if (!orders) {
      throw {
        name: "UserOrdersNotFound",
        message: "Orders for this user cannot be found.",
      };
    }

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByProduct({ id }) {
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

    if (!orderIds) {
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

    if (!order) {
      throw {
        name: "NoCartError",
        message: "There is no existing cart for this user.",
      };
    }
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
