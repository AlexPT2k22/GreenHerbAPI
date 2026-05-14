const express = require('express');
const router = express.Router();
const controller = require('../controllers/reports.controller');

// Relatórios específicos
router.get('/export', controller.exportReport);
router.get('/productivity', controller.getProductivityReport);
router.get('/alerts', controller.getAlertsReport);

module.exports = router;