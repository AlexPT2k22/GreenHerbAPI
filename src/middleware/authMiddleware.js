const authService = require('../services/authService');

function verifyToken(req, res, next) {
  const rawHeader = req.headers['x-access-token'] || req.headers['authorization'];
  if (!rawHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = rawHeader.startsWith('Bearer ') ? rawHeader.slice(7) : rawHeader;
  try {
    const decoded = authService.verifyToken(token);
    req.userId = decoded.id;
    req.userPerfil = decoded.perfil;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function checkRole(rolesPermitidas) {
  return (req, res, next) => {
    if (!authService.hasProfile(req.userPerfil, rolesPermitidas)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
}

module.exports = { verifyToken, checkRole };
