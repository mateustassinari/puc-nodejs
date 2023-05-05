const knex = require('knex');
const knexfile = require('./knexfile.js');

const configOptions = knexfile['development'];

module.exports = knex(configOptions);