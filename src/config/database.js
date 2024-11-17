const knex = require('knex');
const knexConfig = require('../../knexfile');  // Adjust the path if necessary

// Initialize Knex with the appropriate environment configuration (development, staging, production)
const environment = process.env.NODE_ENV || 'development';  // Defaults to 'development' if NODE_ENV is not set
const db = knex(knexConfig[environment]);  // Select the correct configuration based on the environment

module.exports = db;