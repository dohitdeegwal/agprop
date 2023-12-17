const express = require('express');
const v1Router = express.Router();

const brokerRouter = require('./brokerRoutes');
const landlordRouter = require('./landlordRoutes');
const portionRouter = require('./portionRoutes');
const propertyRouter = require('./propertyRoutes');

v1Router.use('/brokers', brokerRouter);
v1Router.use('/landlords', landlordRouter);
v1Router.use('/portions', portionRouter);
v1Router.use('/properties', propertyRouter);

module.exports = v1Router;