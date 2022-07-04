const { Model } = require('objection');
const Knex = require('knex');

require('dotenv').config();

const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development'];

const database = Knex(knexConfig);

Model.knex(database);

module.exports = database;