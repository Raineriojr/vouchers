const knex = require('knex');

const configuration = require('../../knexfile');

const connection = process.env.NODE_ENV || 'development';

module.exports = knex(configuration[connection]);