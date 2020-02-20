const { Client } = require('pg');

const client = new Client({
  user: 'main',
  host: 'localhost',
  port: 54321,
  database: 'main',
  password: 'main',
});

module.exports = client;
