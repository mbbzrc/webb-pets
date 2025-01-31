const client = require("./client");

const { hash, genSalt } = require("bcrypt");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  createNewOrderProduct,
} = require("./index");

const dotenv = require("dotenv");
dotenv.config();

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
        "imageURL" VARCHAR(255) DEFAULT 'imageURL',
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
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price NUMERIC(7, 2),
        quantity INTEGER NOT NULL DEFAULT 0,
        UNIQUE ("productId", "orderId")
      );
    `);
    console.log("Finished building tables.");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Creating Users ...");
    const initialUsers = [
      {
        username: "beatricewhite",
        password: "Password123$",
        firstName: "Beatrice",
        lastName: "White",
        email: "beatricewhitee@gmail.com",
        isAdmin: false,
      },
      {
        username: "anthonybeesley",
        password: "Password123$",
        firstName: "Anthony",
        lastName: "Beesley",
        email: "anthonybeesley@gmail.com",
        isAdmin: false,
      },
      {
        username: "seanburns",
        password: "Password123$",
        firstName: "Sean",
        lastName: "Burns",
        email: "seanburns@gmail.com",
        isAdmin: false,
      },
      {
        username: "admin",
        password: "Password123$",
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@gmail.com",
        isAdmin: true,
      },
    ];

    await Promise.all(
      initialUsers.map(
        async ({ username, password, firstName, lastName, email, isAdmin }) => {
          const salt = await genSalt();
          const hashedPassword = await hash(password, salt);
          createUser({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            isAdmin,
          });
        }
      )
    );

    console.log("Finished creating users!");
  } catch (error) {
    throw error;
  }
}

async function createInitialProducts() {
  const initialProducts = [
    {
      name: "Hanaway Bully Sticks",
      description:
        "Protein-rich bully stick treats for dogs, 20 count. Give your dog a healthy outlet for its urge to chew. Our bully sticks are made with premium natural ingredients guaranteed to delight canines of all sizes.",
      imageURL: "/assets/bullySticks.jpg",
      price: 40.99,
      inStock: true,
      category: "dog",
    },
    {
      name: "CatSafe Plush Mice",
      description:
        "Plush mouse toy with inner pouch for catnip, 3 count. These mice toys are built tough and won't wear quickly.",
      imageURL: "/assets/plushmice.jpg",
      price: 6.99,
      inStock: true,
      category: "cat",
    },
    {
      name: "CatSafe Cat Scratcher",
      description:
        "Cat scratcher toy with tropical palms design. Guaranteed to help your cat relieve the urge to scratch! Protect your furniture by giving your cat a better option.",
      imageURL: "/assets/catScratcher.jpg",
      price: 17.99,
      inStock: true,
      category: "cat",
    },
    {
      name: "Animal Exercise Ball",
      description: "Run-about small animal exercise ball. ",
      imageURL: "/assets/exerciseBall.jpg",
      price: 4.99,
      inStock: false,
      category: "rodent",
    },
    {
      name: "Repti Basking Spot Lamp",
      description: "Spot lamp for snakes and lizards, 100-watt, 2 count.",
      imageURL: "/assets/reptileLamp.jpg",
      price: 14.99,
      inStock: true,
      category: "reptile",
    },
    {
      name: "Gourmet-Style Crickets",
      description: "Gourmet-style crickets reptile food, 1.2-oz can",
      imageURL: "/assets/crickets.jpg",
      price: 2.99,
      inStock: true,
      category: "reptile",
    },
    {
      name: "Mix Ups Cat Treats",
      description: "Mix Ups backyard cookout cat treats, 16-oz tub.",
      imageURL: "/assets/temptationsMixUps.jpg",
      price: 11.99,
      inStock: true,
      category: "cat",
    },
    {
      name: "Non-Clumping Cat Litter",
      description: "Clean scented non-clumping cat litter, 35-lb bag.",
      imageURL: "/assets/catLitter.jpg",
      price: 13.99,
      inStock: true,
      category: "cat",
    },
    {
      name: "Ultra Rubber Ball",
      description: "Ultra rubber ball tough dog toy, Medium, 2 pack.",
      imageURL: "/assets/ultraRubberBall.jpg",
      price: 5.95,
      inStock: true,
      category: "dog",
    },
    {
      name: "Life Protection Dry Dog Food",
      description:
        "Life protection formula adult chicken & brown rice recipe dry dog food, 30-lb bag.",
      imageURL: "/assets/lifeProtectDogFood.jpg",
      price: 51.98,
      inStock: true,
      category: "dog",
    },
    {
      name: "Fairlane Aquarium Starter Kit",
      description:
        "Tropical panaview aquarium starter kit, 5-gallon. Easy way to get started with pet fish!",
      imageURL: "/assets/aquariumKit.jpg",
      price: 39.99,
      inStock: true,
      category: "fish",
    },
    {
      name: "Fairlane Pond Pellets",
      description: "Pond pellets fish food, 10-lb bag.",
      imageURL: "/assets/fishPellets.jpg",
      price: 19.97,
      inStock: true,
      category: "fish",
    },
    {
      name: "NeoGlow Aquarium Starter Kit",
      description: "LED neoGlow aquarium starter kit, Pink, 5.5 gallon.",
      imageURL: "/assets/LEDNeoglowAquarium.jpg",
      price: 19.97,
      inStock: true,
      category: "fish",
    },
    {
      name: "Shale Ledge",
      description: "Shale ledge aquarium & terrarium decor, 1-count",
      imageURL: "/assets/shaleLedge.jpg",
      price: 13.21,
      inStock: false,
      category: "reptile",
    },
    {
      name: "Rock Food & Water Dishes",
      description: "Repti rock reptile rock food & water dishes, Small",
      imageURL: "/assets/foodWaterRock.jpg",
      price: 5.49,
      inStock: true,
      category: "reptile",
    },
    {
      name: "Small Animal Cage",
      description:
        "Home sweet home plastic small animal cage, Color Varies, 28-in",
      imageURL: "/assets/smallAnimalCage.jpg",
      price: 26.99,
      inStock: true,
      category: "rodent",
    },
    {
      name: "Feeder & Water Fountain",
      description: "Mini rabbit feeder & water fountain, 48-oz",
      imageURL: "/assets/rabbitFeeder.jpg",
      price: 7.99,
      inStock: true,
      category: "rodent",
    },
    {
      name: "Orthopedic Sofa Dog Bed",
      description: "Plush & suede orthopedic sofa dog bed, Gray, Large",
      imageURL: "/assets/sofaDogBed.jpg",
      price: 38.99,
      inStock: false,
      category: "dog",
    },
    {
      name: "Fairlane Acquarium Tank 50 Gallon",
      description:
        "Standard glass 50-gallon aquarium for freshwater or marine fish.",
      imageURL: "/assets/aquarium.jpg",
      price: 49.99,
      inStock: true,
      category: "fish",
    },
    {
      name: "PairOkay Natural Hardwood Perch 12 Inch",
      description:
        "Natural hardwood birch product, 12 inches. Intended for larger birds. Includes secure mounting screw.",
      imageURL: "/assets/perch.jpg",
      price: 9.99,
      inStock: true,
      category: "bird",
    },
    {
      name: "PairOkay Parrot Cage",
      description:
        "Spacious parrot cage with multiple access points. Easy removal of cage from base to facilitate quick cleaning. For birds up to 8 inches.",
      imageURL: "/assets/parrot_cage.png",
      price: 29.99,
      inStock: true,
      category: "bird",
    },
  ];

  try {
    console.log("Creating Products ...");

    await Promise.all(
      initialProducts.map(async (product) => {
        await createProduct(product);
      })
    );

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
      datePlaced: new Date(),
    }),
      await createOrder({
        userId: 2,
        status: "completed",
        datePlaced: new Date(),
      }),
      await createOrder({
        userId: 2,
        status: "completed",
        datePlaced: new Date(),
      }),
      await createOrder({
        userId: 4,
        status: "completed",
        datePlaced: new Date(),
      });
    await createOrder({
      userId: 1,
      status: "created",
      datePlaced: new Date(),
    }),
      await createOrder({
        userId: 2,
        status: "created",
        datePlaced: new Date(),
      }),
      await createOrder({
        userId: 3,
        status: "created",
        datePlaced: new Date(),
      }),
      await createOrder({
        userId: 4,
        status: "created",
        datePlaced: new Date(),
      });

    console.log("Finished creating orders!");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

async function createInitialOrderProducts() {
  try {
    console.log("Creating initial order products...");
    const initialOrderProducts = [
      { orderId: 1, productId: 1, price: 40.99, quantity: 1 },
      { orderId: 1, productId: 2, price: 27, quantity: 10 },
      { orderId: 2, productId: 3, price: 151.6, quantity: 20 },
      { orderId: 3, productId: 4, price: 19.97, quantity: 1 },
      { orderId: 3, productId: 5, price: 19.45, quantity: 5 },
      { orderId: 3, productId: 10, price: 5.95, quantity: 1 },
      { orderId: 4, productId: 17, price: 7.99, quantity: 1 },
      { orderId: 4, productId: 18, price: 38.99, quantity: 1 },
    ];
    await Promise.all(
      initialOrderProducts.map((orderProduct) => {
        createNewOrderProduct(orderProduct);
      })
    );
    console.log("Finished creating order products!");
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("getProductById with 1");
    const bullySticks = await getProductById(1);
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
    await createInitialOrderProducts();
  } catch (error) {
    console.error("Error durring rebuildDB: ", error);
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
