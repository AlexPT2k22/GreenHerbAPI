const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');

// Use /auth prefix for all routes in auth.route.js
router.use('/auth', authRoutes);

module.exports = router;