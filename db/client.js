const { Client } = require('pg');
const DB_NAME = 'localhost:5432/data-moguls'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

module.exports = { client };