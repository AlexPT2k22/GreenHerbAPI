const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const User = require('../../models/user.model');

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = (uname) => User.findOne({ where: { username: uname } });
    const result = await authService.login(username, password, findUser);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// POST /auth/refresh
router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = authService.renewAccessToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
