const route = require('express').Router();

const users = require('./users');

route.use('/', users);

module.exports = route; 