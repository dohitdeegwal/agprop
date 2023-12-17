const express = require('express');
const landlordRouter = express.Router();
const landlordController = require('../../controllers/landlordController');

// CRUD operations for Landlords
landlordRouter.post('/', landlordController.createLandlord);
landlordRouter.get('/', landlordController.getAllLandlords);
landlordRouter.get('/:id', landlordController.getLandlordById);
landlordRouter.put('/:id', landlordController.updateLandlord);
landlordRouter.delete('/:id', landlordController.deleteLandlord);

module.exports = landlordRouter;
