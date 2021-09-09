const client = require("./client");

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * FROM products
            WHERE id=$1;`,
      [id]
    );

    if (!product) {
      throw {
        name: "NoProductError",
        message: "This product id does not exist.",
      };
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM products; 
        `);

    if (!rows.length > 0) {
      throw {
        name: "NoProductsError",
        message: "There are no existing products.",
      };
    }

    return rows;
  } catch (error) {
    throw error;
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
        RETURNING *;
        `,
      [name, description, price, imageURL, inStock, category]
    );

    if (!product) {
      throw {
        name: "CreateProductError",
        message: "Unable to create this product.",
      };
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function destroyProduct({ id }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE FROM products 
    WHERE id=$1
    RETURNING *;
    `,
      [id]
    );
    return product;
  } catch (error) {
    throw error; 
  }
}

async function updateProduct({
  id,
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
  UPDATE products
  SET "name"=$1, "description"=$2, "price"=$3, "imageURL"=$4, "inStock"=$5, "category"=$6
  WHERE id=$7
  RETURNING *;
`,
      [name, description, price, imageURL, inStock, category, id]
    );

    return product;
  } catch (error) {
    throw error
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  destroyProduct,
  updateProduct,
};
