const express = require('express');
const router = express.Router();
const controller = require('../controllers/alerts.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// Endpoints específicos
router.patch('/:id', controller.resolveOrIgnore);
router.get('/batch/:batchId', controller.getByBatch);

module.exports = router;