const express = require('express');
const router = express.Router();
const controller = require('../controllers/audit.controller');

// Logs de auditoria
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/user/:userId', controller.getByUser);

module.exports = router;