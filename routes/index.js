const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');

// Rotas de autenticação
router.use('/auth', authRoutes);

module.exports = router;
