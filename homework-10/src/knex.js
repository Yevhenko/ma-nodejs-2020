const Knex = require('knex');
const dbOptions = require('./config/config').DB;
const knex = new Knex(dbOptions);

module.exports = knex;
