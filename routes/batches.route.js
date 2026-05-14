const express = require('express');
const router = express.Router();
const controller = require('../controllers/batches.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// Endpoints específicos
router.patch('/:id/state', controller.updateState);
router.post('/:id/apply-plan', controller.applyPlan);
router.post('/:id/divide', controller.divide);
router.post('/:id/losses', controller.registerLosses);
router.get('/:id/productivity', controller.getProductivity);

module.exports = router;