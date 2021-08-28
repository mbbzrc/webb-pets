const  client  = require("./client");

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

async function createProduct({
  name,
  description,
  price,
  imageURL,
  inStock,
  category,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, price, "imageURL", "inStock", category) 
        VALUES ($1, $2,$3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *
        `,
      [name, description, price, imageURL, inStock, category]
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
