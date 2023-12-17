const express = require('express');
const router = express.Router();
const portionController = require('../../controllers/portionController');

// CRUD operations for Portions
router.post('/', portionController.createPortion);
router.get('/', portionController.getAllPortions);
router.get('/:id', portionController.getPortionById);
router.put('/:id', portionController.updatePortion);
router.delete('/:id', portionController.deletePortion);

module.exports = router;
