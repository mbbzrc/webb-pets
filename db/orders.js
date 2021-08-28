const client = require('./client');

async function createOrder({
    status, 
    userId,
    datePlaced,
    }) {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(status, "userId", "datePlaced")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [status, userId, datePlaced])

        return order;
}

async function getOrderById(id) {
    try {
        const{rows: [order]} = await client.query(`
        SELECT *
        FROM orders
        WHERE id = $1;
        `, [id]);

        if(!order) {
            throw {
                name:"OrderNotFound",
                message: "Order with selected id cannot be found."
            };
        };

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrdersByUser({id}) {
    try {
        const {rows: orders} = await client.query(`
            SELECT *
            FROM orders
            WHERE id = $1;
        `, [id]);
        
        if(!orders) {
            throw {
                name:"UserOrdersNotFound",
                message: "Orders for this user cannot be found."
            };
        };

        return orders;
    } catch (error) {
        throw error
    }
}

async function getOrdersByProduct({id}) {
    try {
        const {rows: orderIds} = await client.query(`
            SELECT orders.id
            FROM orders
            JOIN order_products ON orders.id=order_products."orderId"
            JOIN products ON products.id=order_products."productId"
            WHERE products.id=$1
        `, [id]);

            if (!orderIds) {
                throw {
                    name:"OrderWithProductNotFound",
                    message: "Orders for this product cannot be found."
                };
            };

            return await Promise.all(orderIds.map(
                orders => getOrderById(order.id)
            ));

    } catch (error) {
        throw error
    }
}

async function getAllOrders() {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM orders;
        `);

        return rows;
    } catch(error) {
        throw error
    }
}

async function getCartByUser(user) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT *
            FROM orders
            WHERE orders."userId" = $1
            AND status = 'created';
        `, [user])

        if(!order) {
            return {
                name: "NoCartError",
                message: "There is no existing cart for this user."
            }
        }

        return order;
    } catch (error) {
        throw error
    }
}


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser
}
