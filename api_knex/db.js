const knex = require('knex');
const knexfile = require('./knexfile');

const configOptions = knexfile['development'];

module.exports = knex(configOptions);