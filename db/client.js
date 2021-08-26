// const { Client } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined,
// });

// module.exports =  client ;


const { Client } = require("pg");
const connection_string = process.env.DB_URL || "postgres://localhost:5432/data-moguls";
const client = new Client(connection_string);

module.exports = client;