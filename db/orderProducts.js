const client = require("./client");

async function getOrderProductById(id) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
        SELECT *
        FROM order_products
        WHERE id = $1;
       `,
      [id]
    );

    if (!order_product) {
      throw {
        name: "getOrderProductByIdError",
        message: "Order contains no product with this id.",
      };
    }

    return order_product;
  } catch (error) {
    throw error;
  }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    let {
      rows: [orderProduct],
    } = await client.query(
      `
            SELECT *
            FROM order_products
            WHERE "orderId" = $1
            AND "productId" = $2;
        `,
      [orderId, productId]
    );

    if (orderProduct) {
      orderProduct = await updateOrderProduct({
        id: orderProduct.id,
        price: price,
        quantity: quantity,
      });
    } else {
      orderProduct = await createNewOrderProduct({
        orderId,
        productId,
        price,
        quantity,
      });
    }

    return orderProduct;
  } catch (error) {
    throw error;
  }
}

async function updateOrderProduct({ id, price, quantity }) {
  const updateFields = {};

  if (price) {
    updateFields.price = price;
  }

  if (quantity) {
    updateFields.quantity = quantity;
  }

  const setString = Object.keys(updateFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
        UPDATE order_products
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `,
      Object.values(updateFields)
    );
    //
    console.log("DB - ORDER_PRODUCT: ", order_product);
    //
    return order_product;
  } catch (error) {
    throw error;
  }
}

async function createNewOrderProduct({ orderId, productId, price, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
            INSERT INTO order_products("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [orderId, productId, price, quantity]
    );

    if (!order_product) {
      throw {
        name: "CreateOrderProductError",
        message: "Unable to add this product to order.",
      };
    }

    return order_product;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
            DELETE
            FROM order_products
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );

    return order_product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
  createNewOrderProduct,
};
