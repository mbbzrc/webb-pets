const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "sandbox"
      ? true
      : false,
});

module.exports = { client };
