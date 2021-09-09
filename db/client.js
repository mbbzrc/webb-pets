const dotenv = require("dotenv");
dotenv.config();

const { Client } = require("pg");

var types = require("pg").types;
types.setTypeParser(1700, "text", parseFloat);

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/data-moguls"
);

module.exports = client;
