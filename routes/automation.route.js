const express = require('express');
const router = express.Router();
const controller = require('../controllers/automation.controller');

// Regras de automação
router.post('/rules', controller.createRule);
router.get('/rules', controller.getRules);
router.delete('/rules/:id', controller.deleteRule);

// Modo de automação
router.patch('/mode', controller.toggleMode);

module.exports = router;