const client = require(`./client`);

async function getProductByID(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * FROM products
            WHERE id=$1`,
      [id]
    );

    return product;
  } catch (err) {
    console.error(err);
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM products 
        `);

    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function createProduct({ name, description, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        
        INSERT INTO products(name, description, price) 
        VALUES ($1, $2,$3 )
        RETURNING *
        `,
      [name, description, price]
    );

    return product;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getProductByID,
  getAllProducts,
  createProduct,
};
