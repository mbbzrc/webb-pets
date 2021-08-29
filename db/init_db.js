// code to build and initialize DB goes here
const client = require("./client");
const { createOrder, getAllOrders } = require("./orders");
const { createUser } = require("./users");
const { createProduct, getAllProducts, getProductByID } = require("./products");
const dotenv = require("dotenv")
dotenv.config()

// const { createUser } = require("./db");
const { createProduct } = require("./products");

async function dropTables() {
  try {
    console.log("Dropping Tables ...");
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables.");
  } catch (error) {
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Building Tables ...");
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'imageUrl',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price NUMERIC(7, 2),
        "imageURL" VARCHAR(255) DEFAULT 'imageUrl',
        "inStock" BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id) UNIQUE,
        "orderId" INTEGER REFERENCES orders(id) UNIQUE,
        price NUMERIC(7, 2),
        quantity INTEGER NOT NULL DEFAULT 0
      );
    `);
    console.log("Finished building tables.");
  } catch (error) {
    throw error;
  }
}

//map calls the callback func once for each element (good), in order (not necessary),
//+ constructs new array from results

async function createInitialUsers() {
  try {
    console.log("Creating Users ...");
    // create useful starting data
    await createUser({
      username: "beatricewhite",
      password: "111111",
      firstName: "Beatrice",
      lastName: "White",
      email: "beatricewhitee@gmail.com",
      isAdmin: false,
    }),
      await createUser({
        username: "anthonybeesley",
        password: "222222",
        firstName: "Anthony",
        lastName: "Beesley",
        email: "anthonybeesley@gmail.com",
        isAdmin: false,
      }),
      await createUser({
        username: "seanburns",
        password: "333333",
        firstName: "Sean",
        lastName: "Burns",
        email: "seanburns@gmail.com",
        isAdmin: false,
      }),
      await createUser({
        username: "admin",
        password: "admin",
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@gmail.com",
        isAdmin: false,
      });

    console.log("Finished creating users!");
  } catch (error) {
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Creating Products ...");
    await createProduct({
      name: 'Best Bully Sticks 6"',
      description: "6-inch bully sticks dog treats, 20 count",
      imageUrl: "",
      price: 40.99,
      inStock: true,
      category: "dog",
    }),
      await createProduct({
        name: "Plush Mice",
        description: "Plush mice cat toy with catnip",
        imageUrl: "",
        price: 2.7,
        inStock: true,
        category: "cat",
      }),
      await createProduct({
        name: "Cat Scratcher",
        description: "Cat scratcher toy with catnip, tropical palms",
        imageUrl: "",
        price: 7.58,
        inStock: true,
        category: "cat",
      }),
      await createProduct({
        name: "Pond Pellets",
        description: "Pond pellets fish foot, 10-lb bag",
        imageUrl: "",
        price: 19.97,
        inStock: true,
        category: "fish",
      }),
      await createProduct({
        name: "Animal Exercise Ball",
        description: "Run-about small animal exercise ball",
        imageUrl: "",
        price: 3.89,
        inStock: false,
        category: "small animal",
      }),
      await createProduct({
        name: "Basking Lamp",
        description: "Repti basking reptile spot lamp, 100-watt, 2 count",
        imageUrl: "",
        price: 14.81,
        inStock: true,
        category: "reptile",
      }),
      await createProduct({
        name: "Gourmet-Style Crickets",
        description: "Gourmet-style crickets reptile food, 1.2-oz can",
        imageUrl: "",
        price: 2.99,
        inStock: true,
        category: "reptile",
      }),
      await createProduct({
        name: "Temptations",
        description: "Mixups backyard cookout cat treats, 16-oz tub",
        imageUrl: "",
        price: 8.24,
        inStock: true,
        category: "cat",
      }),
      await createProduct({
        name: "Non-Clumping Cat Litter",
        description: "Febreze scented non-clumping clay cat little, 35-lb bag",
        imageUrl: "",
        price: 13.99,
        inStock: true,
        category: "cat",
      }),
      await createProduct({
        name: "Ultra Rubber Ball",
        description: "Ultra rubber ball tough dog toy, Medium, 2 pack",
        imageUrl: "",
        price: 5.95,
        inStock: true,
        category: "dog",
      }),
      await createProduct({
        name: "Life Protection Dry Dog Food",
        description:
          "Life protection formula adult chicken & brown rice recipe dry dog food, 30-lb bag",
        imageUrl: "",
        price: 51.98,
        inStock: true,
        category: "dog",
      }),
      await createProduct({
        name: "Aquarium Starter Kit",
        description: "Tropical panaview aquarium starter kit, 5-gal",
        imageUrl: "",
        price: 39.99,
        inStock: true,
        category: "fish",
      }),
      await createProduct({
        name: "NeoGlow Aquarium Starter Kit",
        description: "LED neoGlow aquarium starter kit, Pink, 5.5-gal",
        imageUrl: "",
        price: 19.97,
        inStock: true,
        category: "fish",
      }),
      await createProduct({
        name: "Shale Ledge",
        description: "Shale ledge aquarium & terrarium decor, 1-count",
        imageUrl: "",
        price: 13.21,
        inStock: false,
        category: "reptile",
      }),
      await createProduct({
        name: "Rock Food & Water Dishes",
        description: "Repti rock reptile rock food & water dishes, Small",
        imageUrl: "",
        price: 5.49,
        inStock: true,
        category: "reptile",
      }),
      await createProduct({
        name: "Small Animal Cage",
        description:
          "Home sweet home plastic small animal cage, Color Varies, 28-in",
        imageUrl: "",
        price: 26.99,
        inStock: true,
        category: "small animal",
      }),
      await createProduct({
        name: "Feeder & Water Fountain",
        description: "Mini rabbit feeder & water fountain, 48-oz",
        imageUrl: "",
        price: 7.99,
        inStock: true,
        category: "small animal",
      }),
      await createProduct({
        name: "Orthopedic Sofa Dog Bed",
        description: "Plush & suede orthopedic sofa dog bed, Gray, Large",
        imageUrl: "",
        price: 38.99,
        inStock: false,
        category: "dog",
      });

    console.log("Finished creating products!");
  } catch (error) {
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Creating orders...");
    await createOrder({
      userId: 1,
      status: "completed",
    }),
      await createOrder({
        userId: 2,
        status: "completed",
      }),
      await createOrder({
        userId: 3,
        status: "cancelled",
      }),
      await createOrder({
        userId: 4,
        status: "cancelled",
      });

    console.log("Finished creating orders!");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

// async function createInitialOrderProducts() {

//   try {
//     const createInitialOrderProducts = [
//       { productId: 1, orderId: 1, price: 40.99, quantity: 1 },
//       { productId: 2, orderId: 1, price: 27, quantity: 10 },
//       { productId: 3, orderId: 2, price: 151.6, quantity: 20 },
//       { productId: 4, orderId: 3, price: 19.97, quantity: 1 },
//       { productId: 5, orderId: 3, price: 19.45, quantity: 5 },
//       { productId: 10, orderId: 3, price: 5.95, quantity: 1 },
//       { productId: 17, orderId: 4, price: 7.99, quantity: 1 },
//       { productId: 18, orderId: 4, price: 38.99, quantity: 1 },
//     ];
//     // const orderProducts = await Promise
//     //   .all
//     //   // createInitialOrderProducts.map(createOrderProduct)
//     //   ();
//     console.log("Finished creating order products!");
//   } catch (error) {
//     throw error;
//   }
// }

async function testDB() {
  try {
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users)

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("getProductByID with 1");
    const bullySticks = await getProductByID(1);
    console.log("Result:", bullySticks);

    console.log("Calling getAllOrders");
    const orders = await getAllOrders();
    console.log("Result:", orders);

    console.log("getOrderById with 1");
    const beatriceOrder = await getOrderById(1);
    console.log("Result:", beatriceOrder);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    await client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
  } catch (error) {
    console.log("error durring rebuildDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

// async function populateInitialData() {
//   try {
//     // create useful starting data
//   } catch (error) {
//     throw error;
//   }
// }

// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());

//comment
