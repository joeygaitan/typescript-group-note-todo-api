let environment = process.env.NODE_ENV || 'development';
let config = require('../knexfile.ts')[environment]

module.exports = require('knex')(config);