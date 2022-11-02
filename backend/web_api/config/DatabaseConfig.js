const { Model } = require('objection');
const Knex = require('knex');

require('dotenv').config();

let database;
let dbEnv;

try {
    dbEnv = process.env.NODE_ENV || 'development';
    
    const knexConfig = require('../knexfile')[dbEnv];
    
    database = Knex(knexConfig);
    
    Model.knex(database);
} catch (ex) {
    console.log("[Error] DB Config Error: ", ex.stack);
}


module.exports = {
    dbEnv,
    database
};