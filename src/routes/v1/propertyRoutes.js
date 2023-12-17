const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/propertyController');

// CRUD operations for Properties
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

module.exports = router;
