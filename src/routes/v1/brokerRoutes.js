const express = require('express');
const brokerRouter = express.Router();
const brokerController = require('../../controllers/brokerController');

// CRUD operations for Brokers
brokerRouter.post('/', brokerController.createBroker);
brokerRouter.get('/', brokerController.getAllBrokers);
brokerRouter.get('/:id', brokerController.getBrokerById);
brokerRouter.put('/:id', brokerController.updateBroker);
brokerRouter.delete('/:id', brokerController.deleteBroker);

module.exports = brokerRouter;