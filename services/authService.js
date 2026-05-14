const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateAccessToken(userId, perfil) {
  if (!userId || !perfil) {
    throw new Error('userId and perfil are required');
  }
  return jwt.sign(
    { id: userId, perfil },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '2h' }
  );
}

function generateRefreshToken(userId, perfil) {
  if (!userId || !perfil) {
    throw new Error('userId and perfil are required');
  }
  return jwt.sign(
    { id: userId, perfil },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d' }
  );
}

function verifyToken(token, secret) {
  if (!token) {
    throw new Error('Token is required');
  }
  return jwt.verify(token, secret || process.env.JWT_SECRET);
}

function renewAccessToken(refreshToken) {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  const payload = verifyToken(refreshToken, secret);
  return generateAccessToken(payload.id, payload.perfil);
}

async function login(username, password, findUser) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  const user = await findUser(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }
  const userId = user._id ? user._id.toString() : String(user.id);
  const accessToken = generateAccessToken(userId, user.perfil);
  const refreshToken = generateRefreshToken(userId, user.perfil);
  return { accessToken, refreshToken, perfil: user.perfil };
}

function hasProfile(userPerfil, allowedProfiles) {
  if (!userPerfil || !allowedProfiles || !Array.isArray(allowedProfiles)) {
    return false;
  }
  return allowedProfiles.includes(userPerfil);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  renewAccessToken,
  login,
  hasProfile,
};
